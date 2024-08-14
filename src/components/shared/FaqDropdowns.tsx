"use client";
import { useState } from "react";
import { CaretDown, CaretUp } from "@/assets/icons";

interface FaqDropDownsProps {
  questions: { question: string; answer: string }[];
}

export default function FaqDropDowns({ questions }: FaqDropDownsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  return (
    <div className="accordion mt-8 flex flex-col gap-4">
      {questions.map((question, index) => (
        <div
          className="accordion_component rounded-3xl border-gray-200 shadow"
          id="accordionComponent"
          key={index}
        >
          <div className="accordion_component-item">
            <button
              onClick={() =>
                setActiveIndex((orev) => (orev === index ? null : index))
              }
              className="flex w-full items-center justify-between rounded-full border border-primary p-4 text-left"
            >
              <h4 className="accordion_component-item_header font-bold">
                {question.question}
              </h4>
              {activeIndex === index ? <CaretUp /> : <CaretDown />}
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
  );
}
