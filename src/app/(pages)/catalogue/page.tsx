import { products } from "@/assets/data/products";
import ProductCard from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import en from "@/language/en";
import { Slider } from "@/components/ui/slider";
import { formatCurrency, cn } from "@/lib/utils";
import Paginate from "@/components/ui/Paginate";

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
      <div className="flex flex-col md:max-w-screen-sm w-full px-4 xl:max-w-[95%] 2xl:max-w-screen-xl gap-10">
        <div className="w-full flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between">
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

          <div className="flex flex-col gap-8 w-[20%]">
            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-bold">{en.searchByProducts}</h4>
              <form
                action="#"
                data-type="searchForm"
                className="relative w-full md:flex items-center hidden"
              >
                <Input
                  placeholder={`${en.search}...`}
                  type="search"
                  className="rounded-full w-full py-5"
                />
                <button
                  className="header_user-search_btn px-4 font-medium flex absolute right-0 bg-secondary bottom-0 top-0 rounded-full items-center justify-center"
                  type="submit"
                  data-trigger="search"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-bold">{en.productCategories}</h4>
              <ul className="flex flex-col gap-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <label
                      htmlFor={category}
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                        <input
                          type="radio"
                          id={category}
                          hidden
                          className="peer"
                          name="category"
                        />
                        <div className="w-2 h-2 rounded-full peer-checked:bg-primary" />
                      </div>

                      {category}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-bold">{en.weight}</h4>
              <ul className="flex flex-wrap gap-4">
                {weights.map((weight, index) => (
                  <li key={index}>
                    <button
                      className={cn(
                        "py-3 px-5 rounded-lg border border-gray-200",
                        {
                          "bg-primary text-white": weight === 5,
                        }
                      )}
                    >
                      {weight}g
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xl font-bold">{en.filterByPrice}</h4>
              <div className="flex items-center justify-between">
                {[1000, 100000].map((price) => (
                  <p key={price} className="font-medium">
                    {formatCurrency(price, "NGN")}
                  </p>
                ))}
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const categories = [
  en.onSale,
  en.oil,
  en.moisturizers,
  en.spray,
  en.conditioner,
  en.shampoo,
  en.treatment,
];

const weights = [1, 3.5, 5, 7, 14, 28];
