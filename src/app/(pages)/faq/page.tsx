import FaqDropDowns from "@/components/shared/FaQDropdowns";
import en from "@/language/en";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: en.faqPageMetaTitle,
  description: en.faqPageMetaDescription,
};

export default function Faq() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col gap-10 px-4 md:max-w-screen-sm">
        {questionGroups.map((group, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold lg:text-4xl">{group.title}</h2>

            <FaqDropDowns questions={group.questions} />
          </div>
        ))}
      </div>
    </section>
  );
}

const questionGroups = [
  {
    title: en.generalQuestions,
    questions: [
      {
        question: en.questionOne,
        answer: en.answerOne,
      },
      {
        question: en.questionTwo,
        answer: en.answerTwo,
      },
      {
        question: en.questionThree,
        answer: en.answerThree,
      },
    ],
  },
  {
    title: en.orderingAndShopping,
    questions: [
      {
        question: en.questionFour,
        answer: en.answerFour,
      },
      {
        question: en.questionFive,
        answer: en.answerFive,
      },
      {
        question: en.questionSix,
        answer: en.answerSix,
      },
      {
        question: en.questionSeven,
        answer: en.answerSeven,
      },
    ],
  },
  {
    title: en.products,
    questions: [
      {
        question: en.questionEight,
        answer: en.answerEight,
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
    ],
  },
  {
    title: en.stockists,
    questions: [
      {
        question: en.questionTwelve,
        answer: en.answerTwelve,
      },
      {
        question: en.questionThirteen,
        answer: en.answerThirteen,
      },
      {
        question: en.questionFourteen,
        answer: en.answerFourteen,
      },
    ],
  },
];
