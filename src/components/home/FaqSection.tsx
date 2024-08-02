"use client";

import Image from "next/image";
import faqMedia from "../../assets/images/instagram-four.webp";
import en from "@/language/en";
import { CaretDown } from "@/assets/icons";
import { useState } from "react";

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  return (
    <section className="faq_section pb-20 lg:pb-40 w-full flex-col flex items-center justify-center bg-white">
      <div className="faq_container justify-between flex flex-col gap-10 lg:gap-0 lg:flex-row items-center w-full overflow-hidden px-4 lg:px-0 md:max-w-[95%] 2xl:max-w-screen-xl">
        <div
          className="faq_media w-full lg:w-[50%] rounded overflow-hidden h-[300px] xl:h-[700px]"
          data-aos="fade-right"
        >
          <Image
            src={faqMedia}
            alt="media"
            width={800}
            height={600}
            className="w-full h-full"
          />
        </div>
        <div className="faq_main col-xl-6 lg:w-[48%]">
          <div className="faq_main-header">
            <h2 className="faq_main-header_title text-center lg:text-left text-2xl lg:text-4xl font-bold mb-4">
              {en.effectivenessFaq}
            </h2>
            <p className="faq_main-header_text text-center lg:text-left">
              {en.effectivenessFaqDescription}
            </p>
          </div>
          <div className="accordion mt-8 flex flex-col gap-4">
            {productQuestions.map((question, index) => (
              <div
                className="accordion_component shadow rounded-3xl border-gray-200"
                id="accordionComponent"
                key={index}
                data-aos="fade-up"
              >
                <div className="accordion_component-item">
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="w-full text-left flex items-center justify-between p-4 rounded-full border border-primary"
                  >
                    <h4 className="accordion_component-item_header font-bold">
                      {question.question}
                    </h4>
                    <CaretDown />
                  </button>
                  {activeIndex === index && (
                    <div className="accordion-collapse p-4">
                      <p className="accordion_component-item_body">
                        {question.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
