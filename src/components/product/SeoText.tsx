import en from "@/language/en";
import PurifyDomClient from "./PurifyDomClient";

export default function SeoText() {
  return (
    <div className="flex flex-col gap-6 py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        {seoText.map((text, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{text.title}</h2>
            {text.description.map((description, index) => (
              <PurifyDomClient text={description} key={index} />
            ))}
          </div>
        ))}
      </div>
      <p className="text-sm">{en.cataloguePageMoreInfoDescription}</p>
      <p className="text-sm">{en.exploreDescription}</p>
    </div>
  );
}

const seoText = [
  {
    title: en.whyChooseAmariHairCare,
    description: [
      en.whyChooseAmariHairCareDescription,
      en.premiumIngredients,
      en.competitivePricingAndExclusiveOffers,
      en.streamlinedOrderingProcess,
    ],
  },
  {
    title: en.topCategories,
    description: [
      en.topCategoryScalpCare,
      en.topCategoryHairCare,
      en.topCategoryShampoosAndTreatments,
    ],
  },
];
