import cleanser from "../images/cleanser.webp";
import growthSerum from "../images/growth-serum.webp";
import instagramFive from "../images/instagram-five.webp";
import ayurvedic from "../images/instagram-six.webp";
import moisturizer from "../images/moisturizer.webp";
import aloe from "../images/oil.webp";
import protein from "../images/protien-treatment.webp";
import shampoo from "../images/shampoo.webp";
import treatment from "../images/treatment.webp";
import vitaminE2 from "../images/vitamin-e-serum.webp";
import pla from "../images/instagram-two.webp";
import ap from "../images/instagram-four.webp";
import moisturizer2 from "../images/moisturizer-two.webp";
import vpg from "../images/vpg.webp";
import aloeTwo from "../images/aloe-vera-two.webp";
import en from "@/language/en";

// transparent images
import tMoisturizer from "../../assets/images/natural-hair-mois.webp";
import tCleanser from "../../assets/images/ph-balance.webp";
import tSerum from "../../assets/images/vitamin-e.webp";
import tOil from "../../assets/images/aloe-vera-extract-oil.webp";

export const products = [
  {
    name: "Caffeine Scalp Serum",
    slug: "caffeine-scalp-serum",
    rating: 4.5,
    reviews: [
      {
        name: "Oluwafolakemi Anike",
        review:
          "I love the curls on my hair and the length grows slowly and steadily",
        rating: 5,
        product: "caffeine-scalp-serum",
        date: "2023-02-16",
      },
      {
        name: "Anonymous",
        review:
          "Ever since I started using them I have seen improvement. I used to have bald front hair but in two weeks I'm seeing changes.",
        rating: 5,
        product: "caffeine-scalp-serum",
        date: "2021-11-22",
      },
      {
        name: "@Funmicuties",
        review:
          "I used the Hair Growth Serum and I saw results. It didn't take more than 6 weeks and it was my hairdresser that noticed first. She told me about not having hair at that point and after a few weeks then she shouted saying my hair was grown and asked what I used.",
        rating: 4,
        product: "caffeine-scalp-serum",
        date: "2022-09-10",
      },
      {
        name: "Vera. I",
        review:
          "This Hair Growth Serum is the real MVP….already growing baby hair in my bald spot like for real? I am so getting another ASAP…Keep it up, Amari.",
        rating: 5,
        product: "caffeine-scalp-serum",
        date: "2021-07-30",
      },
      {
        name: "Temitope F.",
        review:
          "The length of my hair has increased and my edges too. I don't get scared of braiding anymore.",
        rating: 4,
        product: "caffeine-scalp-serum",
        date: "2023-05-21",
      },
      {
        name: "Anonymous",
        review:
          "I just relaxed my hair and there's about an inch difference. The Serum made my hair grow fast. Thanks, you are doing a good job.",
        rating: 4,
        product: "caffeine-scalp-serum",
        date: "2020-08-13",
      },
      {
        name: "Anonymous",
        review:
          "Honestly, I was shocked when I started seeing changes. Yes, I am seeing more desired growth and a thicker feel and in the space of three weeks o.",
        rating: 5,
        product: "caffeine-scalp-serum",
        date: "2023-10-04",
      },
    ],
    shortDescription:
      "Our flagship product, The Caffeine Scalp Serum, addresses hair loss by stimulating follicle growth, prolonging the hair growth phase, and mitigating the effects of DHT. Unlike traditional treatments, like minoxidil and finasteride, scientific studies show it is a natural alternative with minimal side effects, suitable for sensitive scalp.",
    prices: [
      {
        amount: 10000,
        currency: "NGN",
        locale: "en-NG",
      },
      {
        amount: 7,
        currency: "USD",
        locale: "en-US",
      },
      {
        amount: 5,
        currency: "GBP",
        locale: "en-GB",
      },
    ],

    category: "Scalp Care",
    size: "1.7 oz",
    weight: "50ml",
    tags: ["caffeine", "hair", "growth"],
    images: [growthSerum, vpg, instagramFive],

    description:
      "<b>WHY PEOPLE PREFER CAFFEINE</b><br/><br/>While minoxidil and finasteride have extensive scientific backing for their effectiveness in treating hair loss, some individuals may prefer caffeine as an alternative due to its mildness and fewer reported side effects. Here's how caffeine can be considered a gentler option:<br/><br/> <b>Mildness:</b> Caffeine is generally well-tolerated by most individuals when applied topically to the scalp. Unlike some pharmaceutical treatments, caffeine is derived from natural sources and is milder on the scalp and hair follicles.<br/><br/> <b>Minimal side effects:</b> Minimal Side Effects: Compared to minoxidil and finasteride, which may have systemic side effects such as scalp irritation, itching, blood pressure and sexual dysfunction, caffeine is a safer alternative when used topically. This makes it a preferred option for individuals seeking a gentler approach to hair loss treatment. <br/><br/> <b>Natural Ingredient:</b> Caffeine is a naturally occurring compound found in coffee, tea, and other plants. As a result, many people prefer it as a safer and more sustainable alternative to synthetic pharmaceuticals like minoxidil and finasteride. <br/><br/> <b>Stimulation of Hair Growth:</b> Research suggests that caffeine can promote hair growth by stimulating blood circulation to the scalp, prolonging the anagen (growth) phase of the hair cycle, and counteracting the effects of dihydrotestosterone (DHT), a hormone associated with hair loss. <br/><br/> <b>Convenience and Accessibility:</b> Our Caffeine scalp serum can be readily available over the counter and can be easily incorporated into daily hair care routines. This accessibility makes caffeine a convenient option for individuals seeking a non-prescription solution to hair loss. <br/><br/> <b>Complementary Treatment:</b> While caffeine may not have the same level of scientific evidence as minoxidil and finasteride, some individuals choose to use caffeine-based products in conjunction with other treatments for a multifaceted approach to hair loss management. Combining caffeine with treatments like ketoconazole shampoo may enhance overall efficacy. <br/><br/> <b>Suitable for Sensitive Scalp:</b>  Our Caffeine formulation is gentle on the scalp and suitable for individuals with sensitive scalp or those prone to irritation from other hair loss treatments. This makes the serum a viable option for people who may not tolerate more potent treatments well. <br/><br/> Therefore, while caffeine may lack the extensive scientific validation of minoxidil and finasteride, it presents an appealing option for those seeking a gentler, more natural alternative with potentially fewer side effects. Yet, it's crucial to temper expectations, recognising that individual responses to treatment can differ. Consistent, long-term use may be required to observe significant enhancements in hair growth and thickness. Additionally, the serum's dual function of nourishing the scalp makes it a great option for healthier hair overall.",
    ingredients:
      "Aqua, Aloe Barbadensis (Aloe Vera), Camellia Sinensis (Green Tea)Mentha Piperita (Peppermint) Extract, Lavandula (Lavender) Extract, Clove Extract, Rice Protein, Caffeine, Vegetable Glycerin, Limonene, Benzyl Alcohol, Salicylic Acid, Glycerin (and) Sorbic Acid.",
    howToUse:
      "Apply to Dry or Damp Scalp: For best results, start with a dry or slightly damp scalp. Part your hair into sections to expose the scalp. Gently massage the serum into your scalp using your fingertips. This helps to stimulate blood flow and ensures the serum is evenly distributed. Massage for 2-3 minutes to enhance absorption. Leave in: Do not rinse out the serum. Leave it in your hair to work its magic. You can style your hair as usual after application.",
  },
  {
    name: "Vitamin E Serum",
    slug: "vitamin-e-serum",
    rating: 3.5,
    reviews: [
      {
        name: "Amina Suwaid",
        review:
          "Your products are very well researched and prepared. I find them useful and fit for purpose. My hair always feels good after use.",
        rating: 5,
        product: "vitamin-e-serum",
        date: "2022-12-01",
      },
      {
        name: "@Elickmatilda",
        review:
          "Ever since I started using the Vitamin E Serum, dandruff in my hair has reduced a whole lot.",
        rating: 4,
        product: "vitamin-e-serum",
        date: "2023-06-14",
      },
    ],
    shortDescription:
      "Our Vitamin E serum is carefully crafted with wax ester that closely resembles the sebum produced by the scalp, making it an excellent choice for moisturizing the scalp.",
    prices: [
      {
        amount: 10000,
        currency: "NGN",
        locale: "en-NG",
      },
      {
        amount: 7,
        currency: "USD",
        locale: "en-US",
      },
      {
        amount: 5,
        currency: "GBP",
        locale: "en-GB",
      },
    ],
    category: "Scalp Care",
    size: "1.7 oz",
    weight: "50ml",

    tags: ["hair", "growth"],
    images: [vitaminE2, vpg],
    description:
      "The serum's antioxidant properties are derived from Vitamin E which combats oxidative stress and can help reduce the breakdown of hair follicle cells, preventing hair loss. The serum's moisturizing properties also prevent dandruff and provide moisture to the scalp. ",
    ingredients:
      "Simmondsia Chinensis (Jojoba) Seed Extract, Tocopheryl Acetate, Rosmarinus Officinalis Leaf Oil, Astaxanthin oil.",
    howToUse:
      "Use the dropper to dispense a few drops of the Vitamin E Scalp Serum directly onto your scalp. Gently massage the serum into your scalp using your fingertips. Use small circular motions to ensure the serum is evenly distributed and fully absorbed",
  },
  {
    name: "pH Balancing Mist + Cleanser",
    slug: "ph-balancing-mist-and-cleanser",
    rating: 4.2,
    reviews: [
      {
        name: "Anike",
        review:
          "My scalp is clean and it has not been itchy since I started using the pH Balancing Mist+ Cleanser.",
        rating: 4,
        product: "ph-balancing-mist-and-cleanser",
        date: "2020-09-25",
      },
    ],
    shortDescription:
      "This product is designed to help you achieve the perfect pH balance for the hair. By providing a healthy balance of acidity and alkalinity, this formula ensures that the hair is at its strongest and healthiest.",
    prices: [
      {
        amount: 15000,
        currency: "NGN",
        locale: "en-NG",
      },
      {
        amount: 3.1,
        currency: "USD",
        locale: "en-US",
      },
      {
        amount: 2.5,
        currency: "GBP",
        locale: "en-GB",
      },
    ],

    category: "Scalp Care",
    size: "1.7 oz",
    weight: "100ml",
    tags: ["hair", "growth", "cleanse"],
    images: [cleanser, pla, ap],
    description:
      "pH is a critical factor in determining the strength and health of the hair. The pH scale ranges from 0-14, with acidity levels ranging from 0-6, neutrality at 7, and alkaline levels from 8-14. The hair's natural pH should typically fall within the range of 4.5-5.5 to maintain optimal health This product is designed to help you achieve the perfect pH balance for the hair. By providing a healthy balance of acidity and alkalinity, this formula ensures that the hair is at its strongest and healthiest. This pH-balancing solution also provides additional benefits such as opening pores for deeper penetration of hair growth products and protection against harmful bacteria and fungus. It is a vegan-friendly blend of floral water with no added fragrance.",
    ingredients:
      "Aqua, Lavender extract, Salicylic Acid, Angelica extract, Ginseng extract, Polygonum multiflorum extract, Safflower Extract, Vitex extract, Benzyl Alcohol, Glycerin (and) Sorbic Acid",
    howToUse:
      "Shake the bottle well before use. Section your hair into manageable parts to ensure even application. Spray the mist directly onto your scalp and roots. Focus on areas where you experience buildup or oiliness. Using your fingertips, gently massage the cleanser into your scalp in circular motions. This helps to lift dirt, oil, and impurities from your scalp. Rinse your hair and scalp thoroughly with lukewarm water to remove the cleanser along with any impurities.",
  },
  {
    name: "Natural Hair Moisturizer",
    slug: "natural-hair-moisturizer",
    rating: 3.5,
    reviews: [
      {
        name: "Amina Suwaid",
        review:
          "I find them absolutely useful and fit for purpose. My Hair always feels good after use.",
        rating: 5,
        product: "natural-hair-moisturizer",
        date: "2022-02-07",
      },
      {
        name: "Oluwafolakemi Anike",
        review:
          "I love the curls on my hair and the length!!! growing slowly and steadily.",
        rating: 4,
        product: "natural-hair-moisturizer",
        date: "2023-11-29",
      },
      {
        name: "Anonymous",
        review:
          "The Moisturizer is very lovely, I’m just starting the natural hair journey and the Natural Hair Moisturizer is one of the nice products, to begin with. It makes my hair so soft and coily. Thank you, Amari!",
        rating: 5,
        product: "natural-hair-moisturizer",
        date: "2021-05-18",
      },
    ],
    shortDescription:
      "This fast-absorbing formula ensures that your hair is left feeling silky, smooth, and textured, without the need for the time-consuming LOC/LCO method. ",
    prices: [
      {
        amount: 15000,
        currency: "NGN",
        locale: "en-NG",
      },
      {
        amount: 9.5,
        currency: "USD",
        locale: "en-US",
      },
      {
        amount: 7.3,
        currency: "GBP",
        locale: "en-GB",
      },
    ],

    category: "Hair Care",
    size: "1.7 oz",
    weight: "400ml",
    tags: ["hair", "growth", "cleanse"],
    images: [moisturizer, aloeTwo, moisturizer2],
    description:
      "Unlike traditional leave-in conditioners, our moisturizer aims to provide the hair with the long-lasting nourishment it needs to thrive. The fast-absorbing formula ensures that your hair is left feeling silky, smooth, and textured, without the need for the time-consuming LOC/LCO method. The Natural Hair Moisturizer is designed to provide deep moisture to natural hair, restoring vitality and softness to dry/ brittle hair and keeping the hair moisturized for up to 72 hrs. The fast-absorbing formula of the Natural Hair Moisturizer ensures that it quickly penetrates the hair, leaving no greasy residue.",
    ingredients:
      "Aqua, Sodium Lactate, ButyrospermumParkii (Shea) Butter, Behentrimonium Methosulphate, Butylene Glycol, Hydrogenated Olive Oil, Cetyl Alcohol, Polyquaternium-10, TocopherolAcetate,Propylene Glycol, Diazolidiny| Urea (and)iodopropynyl Butylcarbamate",
    howToUse:
      "Distribute the product evenly through your hair. Focus on the ends of your hair, which are usually the driest.",
  },
  {
    name: "Leave-in Protein Treatment",
    slug: "leave-in-protein-treatment",
    rating: 3.5,
    reviews: [
      {
        name: "Nuella Eroro-Mene",
        review:
          "I love all of your products. I've used them for exactly one month and they have turned my hair into a baby’s hair, especially the Leave-In Protein Treatment. My strands are soft and easy to manage and I now comb my hair easily with very little to no breakage. My hair feels fuller but I am patient.",
        rating: 5,
        product: "leave-in-protein-treatment",
        date: "2023-01-23",
      },
      {
        name: "Chinaza O.",
        review:
          "Hi, Amari. Your products are very good! I have no favorite yet cos I love all too but the Protein treatment is the best, my hair breakage has tremendously reduced. Keep up the good work.",
        rating: 4,
        product: "leave-in-protein-treatment",
        date: "2022-05-15",
      },
    ],
    shortDescription:
      "The Leave-in-Protein Treatment works by temporarily filling in the cracks and gaps in damaged hair cuticles, providing a stronger barrier against breakage. Unlike other protein treatments, our protein treatment is leave-in.",
    prices: [
      {
        amount: 7500,
        currency: "NGN",
        locale: "en-NG",
      },
      {
        amount: 4.7,
        currency: "USD",
        locale: "en-US",
      },
      {
        amount: 3.7,
        currency: "GBP",
        locale: "en-GB",
      },
    ],

    category: "Hair Care",
    size: "1.7 oz",
    weight: "200ml",
    tags: ["hair", "growth", "cleanse"],
    images: [protein, pla],
    description:
      "The Leave-in-Protein Treatment works by temporarily filling in the cracks and gaps in damaged hair cuticles, providing a stronger barrier against breakage. Unlike other protein treatments, our protein treatment is leave-in.",
    ingredients:
      "Aqua, Cetyl Alcohol, Behentrimonium Methosulphate, Butylene Glycol, Hydrolyzed keratin, Butyrospermum Parkii (Shea) Butter, Sodium Lactate, Propylene Glycol, Diazolidinyl Urea, Tocopherol, Aroma, lodopropynyl Butylcarbamate, Limonene.",
    howToUse:
      "Apply the leave-in protein treatment evenly to your damp hair. Focus on areas that are damaged or in need of extra protein. Comb through your hair with a wide-tooth comb to ensure even distribution. This helps in detangling and ensuring the product reaches all strands.",
  },
  {
    name: "Aloe Vera Extract Oil",
    slug: "aloe-vera-extract-oil",
    rating: 3.5,
    reviews: [],
    shortDescription:
      "This oil is extracted from the Aloe Vera plant. It is a lightweight oil that can be used to improve hydration by sealing in moisture",
    prices: [
      {
        amount: 10200,
        currency: "NGN",
        locale: "en-NG",
      },
      {
        amount: 6.4,
        currency: "USD",
        locale: "en-US",
      },
      {
        amount: 5,
        currency: "GBP",
        locale: "en-GB",
      },
    ],

    category: "Hair Care",
    size: "1.7 oz",
    weight: "200g",
    tags: ["hair", "growth", "hydration"],
    images: [aloe, aloeTwo, pla, ap],
    description:
      "This oil is extracted from the Aloe Vera plant. It is a lightweight oil that can be used to improve hydration by sealing in moisture as well as add strength and shine to the hair by diminishing the look of frizzy unruly hair. By diminishing the look of frizzy and unruly hair, Aloe vera extract oil helps to create a smoother and shiny hair texture.",
    ingredients: "Aloe Vera Extract",
    howToUse:
      "Apply a few drops directly to your scalp and gently massage it in. This can be done before bed and left overnight, then washed out the next morning.",
  },
  {
    name: "African Black Soap Clarifying Shampoo Bar ",
    slug: "african-black-soap-clarifying-shampoo-bar",
    rating: 3.5,
    reviews: [
      {
        name: "Bukola O.",
        review:
          "I love the black soap shampoo bar a lot. It lathers well and leaves my hair squeaky clean.",
        rating: 4,
        product: "african-black-soap-clarifying-shampoo-bar",
        date: "2023-08-08",
      },
    ],
    shortDescription:
      "By effectively cleansing the hair, the shampoo helps to maintain a healthy scalp environment. It can soothe and balance the scalp, reducing dryness, and itchiness.",
    prices: [
      {
        amount: 3000,
        currency: "NGN",
        locale: "en-NG",
      },
      {
        amount: 2,
        currency: "USD",
        locale: "en-US",
      },
      {
        amount: 1.5,
        currency: "GBP",
        locale: "en-GB",
      },
    ],
    category: "Scalp Care",
    size: "1.7 oz",
    weight: "100g",
    tags: ["hair", "growth", "treatment"],
    images: [shampoo],
    description:
      "By effectively cleansing the hair, the shampoo helps to maintain a healthy scalp environment. It can soothe and balance the scalp, reducing dryness, and itchiness.",
    ingredients:
      "Plantain peel, palm kernel oil, shea butter, cocoa pods ashes, honey, water, and essential oils.",
    howToUse:
      "Start by thoroughly wetting your hair and scalp with warm water. This helps to open up the hair cuticles and prepares your hair for cleansing. Rub the African black soap shampoo bar between your hands to create a lather, or directly apply the bar to your wet hair. Rinse your hair and scalp thoroughly with warm water to remove all the shampoo.",
  },
  {
    name: "Ayurvedic Hair Treatment (250g)",
    slug: "ayurvedic-hair-treatment",
    rating: 3.5,
    reviews: [
      {
        name: "Anike",
        review:
          "I went to make mini twists after using the Ayurvedic Treatment and the lady said my hair was softer than the previous time.",
        rating: 5,
        product: "ayurvedic-hair-treatment",
        date: "2022-04-11",
      },
    ],
    shortDescription:
      "The synergistic blend of nourishing oils works to strengthen your strands from within, promoting resilience, increasing elasticity and reducing breakage.",
    prices: [
      {
        amount: 6000,
        currency: "NGN",
        locale: "en-NG",
      },
      {
        amount: 10,
        currency: "USD",
        locale: "en-US",
      },
      {
        amount: 9,
        currency: "GBP",
        locale: "en-GB",
      },
    ],

    category: "Hair Care",
    size: "250g",
    weight: "300ml",
    tags: ["hair", "growth", "treatment"],
    images: [treatment, ayurvedic],
    description:
      "The synergistic blend of nourishing oils works to strengthen your strands from within, promoting resilience, increasing elasticity and reducing breakage.",
    ingredients:
      "Shea Butter, Baobab Oil, Bentonite Clay, Shikakai Powder, Sunflower Oil, Clove Essential Oil, Cinnamon Bark, and Lavender Essential Oil.",
    howToUse:
      "Part your hair and apply the oil directly to your scalp using your fingertips.Gently massage in circular motions for 5-10 minutes to stimulate blood flow and improve absorption. Leave the oil on for at least 30 minutes, or overnight for a deep conditioning treatment. Wash your hair with a mild shampoo to remove the oil.",
  },
];

export type TProduct = (typeof products)[0];

export const findProduct = (slug: string) => {
  return products.find(
    (product) => product.slug.toLowerCase().replace(/ /g, "-") === slug,
  );
};

export const popularProducts = products
  .filter((product) => product.rating >= 3)
  .slice(0, 5);

export const categories = [
  {
    name: "Moisturizers",
    image: moisturizer,
  },
  {
    name: "Cleansers",
    image: cleanser,
  },
  {
    name: "Oils",
    image: aloe,
  },
  {
    name: "Serums",
    image: growthSerum,
  },
  {
    name: "Treatments",
    image: treatment,
  },
  {
    name: "Shampoos",
    image: shampoo,
  },
];

export const promo = {
  title: "Free pH Balancing Cleanser: Caffeine Scalp Serum + Vitamin E Serum",
  price: 29000,
  discountedPrice: 20000,
  expires: "2024-11-07T00:00:00",
};

export const slides = [
  {
    name: en.moisturizers,
    slug: products[3].slug,
    image: tMoisturizer,
    product: {
      name: en.moisturizers,
      description: en.moisturizersShortDescription,
      ingredients: [
        en.sodiumLactate,
        en.butyrospermumParkii,
        en.butyleneGlycol,
      ],
    },
  },
  {
    name: en.cleansers,
    image: tCleanser,
    slug: products[2].slug,
    product: {
      name: en.cleansers,
      description: en.phBalancingMistAndCleanserShortDescription,
      ingredients: [
        en.lavenderExtract,
        en.salicylicAcid,
        en.angelicaExtract,
        en.vitexExtract,
      ],
    },
  },
  {
    name: en.oils,
    image: tOil,
    slug: products[4].slug,
    product: {
      name: en.aloeVeraExtractOil,
      description: en.aloeVeraExtractOilShortDescription,
      ingredients: [en.aloeBarbadensis],
    },
  },
  {
    name: en.serums,
    image: tSerum,
    slug: products[1].slug,
    product: {
      name: en.vitaminESerum,
      description: en.vitaminESerumShortDescription,
      ingredients: [
        en.simmondsiaChinensis,
        en.tocopherylAcetate,
        en.rosmarinusOfficinalis,
        en.astaxanthinOil,
      ],
    },
  },
];
