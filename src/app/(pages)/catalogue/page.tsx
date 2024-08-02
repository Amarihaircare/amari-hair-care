import { products } from "@/assets/data/products";
import ProductCard from "@/components/product/ProductCard";
import en from "@/language/en";
import Paginate from "@/components/ui/Paginate";
import SeoText from "@/components/product/SeoText";
import ProductsFilter from "@/components/product/ProductsFilter";

export default function Catalogue({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = searchParams?.page
    ? parseInt(searchParams.page as string)
    : 1;
  const from = (currentPage - 1) * 9;
  const to = from + 10;
  const total = Math.ceil(products.length / 9);
  console.log(searchParams);

  return (
    <section className="w-full flex flex-col pb-10 lg:pb-20 pt-10 lg:pt-20  items-center justify-center bg-white">
      <div className="flex flex-col md:max-w-screen-sm w-full px-4 xl:max-w-[95%] 2xl:max-w-screen-xl">
        <div className="w-full flex flex-col-reverse gap-10 lg:gap-0 lg:flex-row justify-between">
          <div className="w-lg:w-[78%] flex flex-col gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(from, to).map((product, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <ProductCard
                    name={product.name}
                    image={product.images[0]}
                    price={product.price}
                    rating={product.rating}
                    slug={product.slug}
                    discount={product?.discount}
                  />
                </div>
              ))}
            </div>
            <Paginate currentPage={currentPage} lastPage={total} />
          </div>
          <ProductsFilter />
        </div>
        <SeoText />
      </div>
    </section>
  );
}
