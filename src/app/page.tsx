import CategoriesSection from "@/components/home/CategoriesSection";
import HomeHero from "@/components/home/HomeHero";
import NewsletterSection from "@/components/home/NewsletterSection";
import PopularSection from "@/components/home/PopularSection";
import PromoSection from "@/components/home/PromoSection";
import TestimonialsSection from "@/components/home/TestimonialSection";
import FaqSection from "@/components/home/FaqSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomeHero />
      <CategoriesSection />
      <PopularSection />
      <PromoSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FaqSection />
    </main>
  );
}
