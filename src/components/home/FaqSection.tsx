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
              {en.effectivenessFaq}
            </h2>
            <p className="faq_main-header_text text-center lg:text-left">
              {en.effectivenessFaqDescription}
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
    question: en.questionTwo,
    answer: en.answerTwo,
  },
  {
    question: en.questionThree,
    answer: en.answerThree,
  },
  {
    question: en.questionNine,
    answer: en.answerNine,
  },
  {
    question: en.questionTen,
    answer: en.answerTen,
  },
  {
    question: en.questionEleven,
    answer: en.answerEleven,
  },
];
