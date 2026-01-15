"use client";

import en from "@/language/en";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import promoProduct from "../../assets/images/collection.webp";
import PromoTimer from "./PromoTimer";
import { Input } from "../ui/input";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface SubmissionResponse {
  status: "success" | "error";
  message: string;
}

export default function PromoSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
  }); 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/submit-to-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const result: SubmissionResponse = await response.json();

      if (result.status === "success") {
        setMessage("Thank you! You've been successfully added to our community.");
        setFormData({ firstName: "", lastName: "", email: "" });
        setSubmitted(true);
      } else {
        setMessage("Error: " + result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Error submitting form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="promo_section flex w-full flex-col items-center justify-center bg-background py-20 lg:py-40">
      <div className="promo_container flex w-full flex-col items-center justify-between gap-10 overflow-hidden px-4 md:max-w-[95%] lg:flex-row lg:px-0 2xl:max-w-screen-xl">
        <div className="wrapper flex max-w-[500px] flex-col items-center lg:items-start">
          <div className="promo_header mb-6">
            <Link
              className="promo_header-title mb-6 block text-center text-2xl font-bold lg:text-left lg:text-4xl"
              href="/catalogue"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Amari Community Where Clean Beauty Meets Conscious Living
            </Link>
            <p className="promo_header-text text-center lg:text-left">
              Welcome to the heart of Amari, Our community, a vibrant, purpose-driven network of
              people who care deeply about what goes on and into their bodies from scalp to toe,
              we are building a movement around clean beauty, holistic wellness, and empowered living.
            </p>
          </div>

          <PromoTimer />

          <form onSubmit={handleSubmit} className="space-y-4 w-full mt-6">
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="rounded-full py-6 bg-white"
            />
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="rounded-full py-6 bg-white"
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={en.email}
              className="rounded-full py-6 bg-white"
            />
            <Button
              type="submit"
              disabled={isSubmitting || submitted}
              className="w-full rounded-full py-6 mt-6 font-semibold"
            >
              {submitted ? "Submitted ✓" : isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {message && (
              <div
                className={`mt-4 p-3 rounded-md ${
                  message.includes("successful")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>

        <div className="media" data-aos="fade-left">
          <Image
            src={promoProduct}
            alt="media"
            width={800}
            height={600}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
