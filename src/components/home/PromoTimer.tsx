"use client";
import useCountdown from "@/hooks/useCountdown";
import en from "@/language/en"; // e.g. { days: "Days", hours: "Hours", mins: "Mins", secs: "Secs" }
import { useEffect, useState } from "react";

export default function PromoTimer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Target date: 165 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 165);

  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const timeCards = [
    {
      title: en.days,
      left: String(days).padStart(2, "0"),
    },
    {
      title: en.hours,
      left: String(hours).padStart(2, "0"),
    },
    {
      title: en.mins,
      left: String(minutes).padStart(2, "0"),
    },
    {
      title: en.secs,
      left: String(seconds).padStart(2, "0"),
    },
  ];

  if (!isClient) return null;

  return (
    <div className="promo_timer mb-6 grid w-full grid-cols-4 justify-center gap-4 lg:w-[75%] lg:justify-start">
      {timeCards.map((time, index) => (
        <div
          className="timer_block flex h-[70px] flex-col items-center justify-center rounded border border-primary shadow lg:h-20"
          key={index}
        >
          <p className="timer_block-number text-2xl font-semibold text-green-800">
            {time.left}
          </p>
          <p>{time.title}</p>
        </div>
      ))}
    </div>
  );
}
