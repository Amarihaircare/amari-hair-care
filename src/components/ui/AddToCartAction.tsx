"use client";
import en from "@/language/en";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function AddToCartAction() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }

  function decrement() {
    if (count === 0) return;
    setCount((prev) => prev - 1);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2 bg-white border border-gray-200 shadow px-4 rounded-full">
        <button onClick={decrement}>
          <Minus strokeWidth={3} />
        </button>
        <Input
          type="text"
          className="max-w-6 text-xl p-0 font-medium border-none outline-none focus:border-none focus:outline-none text-center"
          readOnly
          value={count}
        />

        <button onClick={increment}>
          <Plus strokeWidth={3} />
        </button>
      </div>
      <Button variant={"secondary"} className="py-6 font-semibold">
        {en.addToCart}
      </Button>
    </div>
  );
}
