"use client";

import en from "@/language/en";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; 

interface NewsletterFormData {
  email: string;
}

interface SubmissionResponse {
  status: "success" | "error";
  message: string;
}

export default function NewsletterSection() {
  const [formData, setFormData] = useState<NewsletterFormData>({ email: "" });
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
      const response = await fetch("/api/submit-newsletter", {
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
        setMessage("Thank you for subscribing to our newsletter.");
        setFormData({ email: "" });
        setSubmitted(true);
        console.log("Newsletter submission successful:", result);
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
    <section className="newsletter_section pb-20 lg:pb-40 w-full flex flex-col items-center justify-center bg-white">
      <div className="newsletter_container flex rounded bg-primary flex-col items-center justify-center w-full overflow-hidden px-4 md:max-w-[95%] 2xl:max-w-screen-xl py-20 text-white">
        <div className="newsletter_content flex flex-col items-center gap-4 max-w-[480px]">
          <div className="newsletter_header flex flex-col items-center gap-4">
            <h2 className="text-3xl lg:text-4xl text-center font-bold">
              {en.newsletterHeader}
            </h2>
            <p className="text-center text-white">
              {en.newsletterDescription}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4 mt-6 max-w-[340px]">
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={en.email}
              className="rounded-full py-6 bg-white text-black"
              required
            />

            <Button
              type="submit"
              disabled={isSubmitting || submitted}
              className="w-full rounded-full py-6 font-semibold text-primary bg-secondary transform transition-transform duration-200 hover:scale-105 hover:bg-secondary hover:text-primary hover:shadow-none hover:brightness-100"
            >
              {submitted ? "Submitted ✓" : isSubmitting ? "Submitting..." : en.send}
            </Button>

            {message && (
              <div
                className={`mt-4 p-3 rounded-md text-sm text-center ${
                  message.includes("Thank") || message.includes("success")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
