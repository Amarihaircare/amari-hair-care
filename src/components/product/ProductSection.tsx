"use client";

import Paginate from "@/components/ui/Paginate";
import ProductCard from "./ProductCard";
import ProductsFilter from "./ProductsFilter";
import { useState, useEffect } from "react";
import en from "@/language/en";
import { useSearchParams } from "next/navigation";

// Use the exact domain Zoho provided in their email
const ZOHO_STORE_URL = "https://amariscalpcare.zohoecommerce.com";
const PEXELS_FALLBACK = "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const getCdnImageUrl = (imagePath: string): string => {
  if (!imagePath) return "";

  // Ensure absolute URL
  let url = imagePath;
  if (!url.startsWith("http")) {
    url = `${ZOHO_STORE_URL}${url}`;
  }

  // Swap to CDN domain
  url = url.replace(
    "https://amariscalpcare.zohoecommerce.com",
    "https://cdn1.zohoecommerce.com",
  );

  // Separate query if present
  const [pathWithoutQuery, existingQuery] = url.split("?");

  // Strip any existing /WxH at the end and inject /800x800
  const cleanPath = pathWithoutQuery.replace(/\/\d+x\d+$/, "");
  let finalPath = `${cleanPath}/800x800`;

  // Build query string and ensure storefront_domain is present
  let query = existingQuery || "";
  if (!query.includes("storefront_domain=")) {
    query = query
      ? `${query}&storefront_domain=amariscalpcare.zohoecommerce.com`
      : "storefront_domain=amariscalpcare.zohoecommerce.com";
  }

  if (query) {
    finalPath += `?${query}`;
  }

  return finalPath;
};

type ProductSectionProps = {
  initialProducts?: any[];
};

export default function ProductSection({ initialProducts }: ProductSectionProps) {
  const [allProducts, setAllProducts] = useState<any[]>(initialProducts ?? []);
  const [filteredProducts, setFilteredProducts] = useState<any[]>(initialProducts ?? []);
  const [isLoading, setIsLoading] = useState(initialProducts === undefined);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("all");
  const [currentPriceMax, setCurrentPriceMax] = useState<number>(100000);
  const searchParams = useSearchParams();
  const searchQueryFromUrl = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState<string>(searchQueryFromUrl);

  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;
  const itemsPerPage = 9;
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage;

  useEffect(() => {
    if (initialProducts !== undefined) return;
    async function getProducts() {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      try {
        setIsLoading(true);
        // The /api/products route now uses the unauthenticated domain-name header
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), 15000);
        const res = await fetch("/api/products", { cache: "no-store", signal: controller.signal });
        if (!res.ok) throw new Error("Failed to sync inventory");

        const data = await res.json();
        const items = data.products || [];

        setAllProducts(items);
        setFilteredProducts(items);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        // ensure timeout cleared
        try { if (timeoutId) clearTimeout(timeoutId); } catch {}
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch("/api/categories", { cache: "force-cache" });
        if (!res.ok) return;
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Fetch categories error:", err);
      }
    }
    getCategories();
  }, []);

  // Filter Handlers
  const handleSearch = (kwd: string) => {
    setSearchValue(kwd);
    const value = kwd.toLowerCase();
    if (!value) {
      setFilteredProducts(allProducts);
      return;
    }
    setFilteredProducts(allProducts.filter((p) => p.name.toLowerCase().includes(value)));
  };

  const minPrice = 1000;
  const maxPrice = 100000;

  const handleSlide = (value: number) => {
    const clamped = Math.min(Math.max(value, minPrice), maxPrice);
    setCurrentPriceMax(clamped);
    setFilteredProducts(
      allProducts.filter((p) => {
        const price = p.variants?.[0]?.selling_price || 0;
        return price >= minPrice && price <= clamped;
      }),
    );
  };

  const handleCategory = (categoryId: string) => {
    setCurrentCategoryId(categoryId);
    if (categoryId === "all") {
      setFilteredProducts(allProducts);
      return;
    }
    setFilteredProducts(
      allProducts.filter((p) => {
        const prodId = String(p.category_id || p.categoryid || "").trim();
        if (prodId && prodId === categoryId) return true;
        const catMeta = categories.find(
          (c: any) =>
            String(c.category_id || c.id || "").trim() === categoryId,
        );
        const metaName = String(catMeta?.name || "").toLowerCase();
        const prodName = String(p.category_name || "").toLowerCase();
        return metaName && prodName && metaName === prodName;
      }),
    );
  };

  useEffect(() => {
    if (!searchQueryFromUrl) {
      setSearchValue("");
      setFilteredProducts(allProducts);
      return;
    }
    setSearchValue(searchQueryFromUrl);
    const value = searchQueryFromUrl.toLowerCase();
    setFilteredProducts(allProducts.filter((p) => p.name.toLowerCase().includes(value)));
  }, [searchQueryFromUrl, allProducts]);

  if (isLoading) return <div className="w-full py-20 text-center font-bold text-[#284721]">Syncing Amari Inventory...</div>;

  return (
    <div className="flex w-full flex-col-reverse justify-between gap-10 lg:flex-row">
      <div className="flex w-full flex-col gap-6 lg:w-[78%]">
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed py-10">
            <p className="text-gray-500">{en.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.slice(from, to).map((product) => {
              const variant = product.variants?.[0];
              const sellingPrice = variant?.selling_price || 0;
              const labelPrice = variant?.label_price || 0;

              const discountPercent = labelPrice > sellingPrice
                ? Math.round(((labelPrice - sellingPrice) / labelPrice) * 100)
                : undefined;

              const rawPath = product.images?.[0]?.url as string | undefined;

              const baseUrl = rawPath
                ? rawPath.startsWith("http")
                  ? rawPath
                  : `${ZOHO_STORE_URL}${rawPath}`
                : "";

              const imageSource = baseUrl ? getCdnImageUrl(baseUrl) : PEXELS_FALLBACK;

              return (
                <ProductCard
                  key={product.product_id}
                  variantId={variant?.variant_id || variant?.item_id}
                  name={product.name}
                  image={imageSource}
                  prices={[{ amount: sellingPrice, currency: "NGN", locale: "en-NG" }]}
                  rating={5}
                  slug={product.handle || product.product_id}
                  discount={discountPercent}
                />
              );
            })}
          </div>
        )}
        <Paginate currentPage={currentPage} lastPage={Math.ceil(filteredProducts.length / itemsPerPage)} />
      </div>
      <ProductsFilter
        handleSearch={handleSearch}
        handleSlide={handleSlide}
        handleCategory={handleCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        currentPriceMax={currentPriceMax}
        categories={categories}
        currentCategoryId={currentCategoryId}
        searchValue={searchValue}
      />
    </div>
  );
}
