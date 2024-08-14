"use client";
import { promo } from "@/assets/data/products";
import useCountdown from "@/hooks/useCountdown";
import en from "@/language/en";

export default function PromoTimer() {
  const { days, hours, minutes, seconds } = useCountdown(promo.expires);
  const timeCards = [
    {
      title: en.days,
      left: `${days < 10 ? "0" : ""}${days}`,
    },
    {
      title: en.hours,
      left: `${hours < 10 ? "0" : ""}${hours}`,
    },
    {
      title: en.mins,
      left: `${minutes < 10 ? "0" : ""}${minutes}`,
    },
    {
      title: en.secs,
      left: `${seconds < 10 ? "0" : ""}${seconds}`,
    },
  ];

  return (
    <div className="promo_timer mb-6 grid w-full grid-cols-4 justify-center gap-4 lg:w-[75%] lg:justify-start">
      {timeCards.map((time, index) => (
        <div
          className="timer_block flex h-[70px] flex-col items-center justify-center rounded border border-primary shadow lg:h-20"
          key={index}
        >
          <p
            className="timer_block-number text-2xl font-semibold text-green-800"
            id="seconds"
          >
            {time.left}
          </p>{" "}
          <p>{time.title}</p>
        </div>
      ))}
    </div>
  );
}
