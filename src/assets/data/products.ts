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

export const products = [
  {
    name: "Caffeine Scalp Serum",
    slug: "caffeine-scalp-serum",
    rating: 4.5,
    reviews: [
      {
        name: "John Doe",
        rating: 4,
        date: "2021-10-01",
        review:
          "This product is amazing! It has helped me grow my hair back after years of hair loss. I highly recommend it to anyone who is struggling with hair loss.",
        images: [],
      },
      {
        name: "Jane Doe",
        rating: 5,
        date: "2021-10-01",
        review:
          "I have been using this product for a few months now and I have noticed a significant improvement in the thickness and fullness of my hair. I highly recommend it!",
      },
    ],
    shortDescription:
      "Our flagship product, The Caffeine Scalp Serum, addresses hair loss by stimulating follicle growth, prolonging the hair growth phase, and mitigating the effects of DHT. Unlike traditional treatments, like minoxidil and finasteride, scientific studies show it is a natural alternative with minimal side effects, suitable for sensitive skin.",
    price: 10000,
    category: "oil",
    size: "1.7 oz",
    tags: ["caffeine", "hair", "growth"],
    images: [growthSerum, vpg, instagramFive],

    description:
      "<b>WHY PEOPLE PREFER CAFFEINE</b><br/><br/>While minoxidil and finasteride have extensive scientific backing for their effectiveness in treating hair loss, some individuals may prefer caffeine as an alternative due to its mildness and fewer reported side effects. Here's how caffeine can be considered a gentler option:<br/><br/> <b>Mildness:</b> Caffeine is generally well-tolerated by most individuals when applied topically to the scalp. Unlike some pharmaceutical treatments, caffeine is derived from natural sources and is milder on the scalp and hair follicles.<br/><br/> <b>Minimal side effects:</b> Minimal Side Effects: Compared to minoxidil and finasteride, which may have systemic side effects such as scalp irritation, itching, blood pressure and sexual dysfunction, caffeine is a safer alternative when used topically. This makes it a preferred option for individuals seeking a gentler approach to hair loss treatment. <br/><br/> <b>Natural Ingredient:</b> Caffeine is a naturally occurring compound found in coffee, tea, and other plants. As a result, many people prefer it as a safer and more sustainable alternative to synthetic pharmaceuticals like minoxidil and finasteride. <br/><br/> <b>Stimulation of Hair Growth:</b> Research suggests that caffeine can promote hair growth by stimulating blood circulation to the scalp, prolonging the anagen (growth) phase of the hair cycle, and counteracting the effects of dihydrotestosterone (DHT), a hormone associated with hair loss. <br/><br/> <b>Convenience and Accessibility:</b> Our Caffeine scalp serum can be readily available over the counter and can be easily incorporated into daily hair care routines. This accessibility makes caffeine a convenient option for individuals seeking a non-prescription solution to hair loss. <br/><br/> <b>Complementary Treatment:</b> While caffeine may not have the same level of scientific evidence as minoxidil and finasteride, some individuals choose to use caffeine-based products in conjunction with other treatments for a multifaceted approach to hair loss management. Combining caffeine with treatments like ketoconazole shampoo may enhance overall efficacy. <br/><br/> <b>Suitable for Sensitive Skin:</b>  Our Caffeine formulation is gentle on the scalp and suitable for individuals with sensitive skin or those prone to irritation from other hair loss treatments. This makes the serum a viable option for people who may not tolerate more potent treatments well. <br/><br/> Therefore, while caffeine may lack the extensive scientific validation of minoxidil and finasteride, it presents an appealing option for those seeking a gentler, more natural alternative with potentially fewer side effects. Yet, it's crucial to temper expectations, recognising that individual responses to treatment can differ. Consistent, long-term use may be required to observe significant enhancements in hair growth and thickness. Additionally, the serum's dual function of nourishing the scalp makes it a great option for healthier hair overall.",
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
        name: "John Doe",
        rating: 4,
        date: "2021-10-01",
        review:
          "This product is amazing! It has helped me grow my hair back after years of hair loss. I highly recommend it to anyone who is struggling with hair loss.",
        images: [],
      },
      {
        name: "Jane Doe",
        rating: 5,
        date: "2021-10-01",
        review:
          "I have been using this product for a few months now and I have noticed a significant improvement in the thickness and fullness of my hair. I highly recommend it!",
      },
    ],
    shortDescription:
      "Our Vitamin E serum is carefully crafted with wax ester that closely resembles the sebum produced by the scalp, making it an excellent choice for moisturizing the scalp.",
    price: 10000,
    category: "oil",
    size: "1.7 oz",
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
    discount: 10,
    reviews: [
      {
        name: "John Doe",
        rating: 4,
        date: "2021-10-01",
        review:
          "This product is amazing! It has helped me grow my hair back after years of hair loss. I highly recommend it to anyone who is struggling with hair loss.",
        images: [],
      },
      {
        name: "Jane Doe",
        rating: 5,
        date: "2021-10-01",
        review:
          "I have been using this product for a few months now and I have noticed a significant improvement in the thickness and fullness of my hair. I highly recommend it!",
      },
    ],
    shortDescription:
      "This product is designed to help you achieve the perfect pH balance for the hair. By providing a healthy balance of acidity and alkalinity, this formula ensures that the hair is at its strongest and healthiest.",
    price: 10000,
    category: "oil",
    size: "1.7 oz",
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
        name: "John Doe",
        rating: 4,
        date: "2021-10-01",
        review:
          "This product is amazing! It has helped me grow my hair back after years of hair loss. I highly recommend it to anyone who is struggling with hair loss.",
        images: [],
      },
      {
        name: "Jane Doe",
        rating: 5,
        date: "2021-10-01",
        review:
          "I have been using this product for a few months now and I have noticed a significant improvement in the thickness and fullness of my hair. I highly recommend it!",
      },
    ],
    shortDescription:
      "This fast-absorbing formula ensures that your hair is left feeling silky, smooth, and textured, without the need for the time-consuming LOC/LCO method. ",
    price: 15000,
    category: "jelly",
    size: "1.7 oz",
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
    discount: 15,
    rating: 3.5,
    reviews: [
      {
        name: "John Doe",
        rating: 4,
        date: "2021-10-01",
        review:
          "This product is amazing! It has helped me grow my hair back after years of hair loss. I highly recommend it to anyone who is struggling with hair loss.",
        images: [],
      },
      {
        name: "Jane Doe",
        rating: 5,
        date: "2021-10-01",
        review:
          "I have been using this product for a few months now and I have noticed a significant improvement in the thickness and fullness of my hair. I highly recommend it!",
      },
    ],
    shortDescription:
      "The Leave-in-Protein Treatment works by temporarily filling in the cracks and gaps in damaged hair cuticles, providing a stronger barrier against breakage. Unlike other protein treatments, our protein treatment is leave-in.",
    price: 7500,
    category: "oil",
    size: "1.7 oz",
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
    reviews: [
      {
        name: "John Doe",
        rating: 4,
        date: "2021-10-01",
        review:
          "This product is amazing! It has helped me grow my hair back after years of hair loss. I highly recommend it to anyone who is struggling with hair loss.",
        images: [],
      },
      {
        name: "Jane Doe",
        rating: 5,
        date: "2021-10-01",
        review:
          "I have been using this product for a few months now and I have noticed a significant improvement in the thickness and fullness of my hair. I highly recommend it!",
      },
    ],
    shortDescription:
      "This oil is extracted from the Aloe Vera plant. It is a lightweight oil that can be used to improve hydration by sealing in moisture",
    price: 10200,
    category: "oil",
    size: "1.7 oz",
    tags: ["hair", "growth", "hydration"],
    images: [aloeTwo, pla, ap, aloe],
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
        name: "John Doe",
        rating: 4,
        date: "2021-10-01",
        review:
          "This product is amazing! It has helped me grow my hair back after years of hair loss. I highly recommend it to anyone who is struggling with hair loss.",
        images: [],
      },
      {
        name: "Jane Doe",
        rating: 5,
        date: "2021-10-01",
        review:
          "I have been using this product for a few months now and I have noticed a significant improvement in the thickness and fullness of my hair. I highly recommend it!",
      },
    ],
    shortDescription:
      "By effectively cleansing the hair, the shampoo helps to maintain a healthy scalp environment. It can soothe and balance the scalp, reducing dryness, and itchiness.",
    price: 3000,
    category: "soap",
    size: "1.7 oz",
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
        name: "John Doe",
        rating: 4,
        date: "2021-10-01",
        review:
          "This product is amazing! It has helped me grow my hair back after years of hair loss. I highly recommend it to anyone who is struggling with hair loss.",
        images: [],
      },
      {
        name: "Jane Doe",
        rating: 5,
        date: "2021-10-01",
        review:
          "I have been using this product for a few months now and I have noticed a significant improvement in the thickness and fullness of my hair. I highly recommend it!",
      },
    ],
    shortDescription:
      "The synergistic blend of nourishing oils works to strengthen your strands from within, promoting resilience, increasing elasticity and reducing breakage.",
    price: 6000,
    category: "oil",
    size: "250g",
    tags: ["hair", "growth", "treatment"],
    images: [ayurvedic, treatment],
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
    name: "Oil",
    image: aloe,
  },
  {
    name: "Serum",
    image: growthSerum,
  },
  {
    name: "Treatments",
    image: treatment,
  },
  {
    name: "Shampoo",
    image: shampoo,
  },
];
