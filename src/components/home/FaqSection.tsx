import Image from "next/image";
import faqMedia from "../../assets/images/instagram-four.webp";
import en from "@/language/en";
import FaqDropDowns from "../shared/FaqDropdowns";

export default function FaqSection() {
  return (
    <section className="faq_section flex w-full flex-col items-center justify-center bg-white pb-20 lg:pb-40">
      <div className="faq_container flex w-full flex-col items-center justify-between gap-10 overflow-hidden px-4 md:max-w-[95%] lg:flex-row lg:gap-0 lg:px-0 2xl:max-w-screen-xl">
        <div
          className="faq_media h-[300px] w-full overflow-hidden rounded lg:w-[50%] xl:h-[700px]"
          data-aos="fade-right"
        >
          <Image
            src={faqMedia}
            alt="media"
            width={800}
            height={600}
            className="h-full w-full"
          />
        </div>
        <div className="faq_main col-xl-6 lg:w-[48%]">
          <div className="faq_main-header">
            <h2 className="faq_main-header_title mb-4 text-center text-2xl font-bold lg:text-left lg:text-4xl">
              The Amari Model
            </h2>
            <p className="faq_main-header_text text-center lg:text-left">
              Hair Care. Scalp Care. PaaS <br />
Amari is more than a product. It’s a system designed to make hair care simpler and more effective for everyone.
            </p>
          </div>
          <FaqDropDowns questions={productQuestions} />
        </div>
      </div>
    </section>
  );
}

const productQuestions = [
  {
    question: 'Hair Care',
    answer: 'Rooted in Science. Powered by Nature. We create high-performance formulas that respect your hair’s natural structure, whether curly, coily, wavy, relaxed, or in between.By blending botanical ingredients with science-backed actives, we strengthen hair and reduce breakage with fewer products.',
  },
  {
    question: 'Scalp Care',
  answer: `Healthy hair starts at the scalp.
Amari creates scalp-first products that clear buildup, calm irritation, boost circulation, and support long-term hair growth.`
  },
  {
    question: 'PaaS: Products as a Service',
    answer: `Professional Results. In-Salon Experience.
Our PaaS initiative equips select salons to offer Amari products as part of in-salon treatments, so you can build your hair care routine convenient around your salon visits.
`,
  },
  // {
  //   question: en.questionTen,
  //   answer: en.answerTen,
  // },
  // {
  //   question: en.questionEleven,
  //   answer: en.answerEleven,
  // },
];
