"use client";
import en from "@/language/en";
import DOMPurify from "dompurify";

export default function SeoText() {
  return (
    <div className="py-20 flex flex-col gap-6">
      <div className="grid lg:grid-cols-2 gap-10">
        {seoText.map((text, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{text.title}</h2>
            {text.description.map((description, index) => (
              <p
                key={index}
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description),
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="text-sm">{en.exploreDescription}</p>
    </div>
  );
}
const seoText = [
  {
    title: en.cataloguePageMoreInfoTitle,
    description: [en.cataloguePageMoreInfoDescription],
  },
  {
    title: en.whyChooseAmariHairCare,
    description: [en.whyChooseAmariHairCareDescription],
  },
  {
    title: en.wideRangeOfProducts,
    description: [en.wideRangeOfProductsDescription],
  },
  {
    title: en.premiumIngredients,
    description: [en.premiumIngredientsDescription],
  },
  {
    title: en.easyShoppingExperience,
    description: [en.easyShoppingExperienceDescription],
  },
  {
    title: en.unbeatablePrices,
    description: [en.unbeatablePricesDescription],
  },
  {
    title: en.topCategories,
    description: [
      en.topCategoryShampoo,
      en.topCategoryMoisturizers,
      en.topCategorySerums,
      en.topCategoryTreatments,
    ],
  },
];
