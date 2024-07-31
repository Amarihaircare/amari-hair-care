import type { Metadata } from "next";
import { Nunito_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import "aos/dist/aos.css"; // You can also use <link> for styles
import en from "@/language/en";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: en.amariHaircare,
  description: en.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${montserrat.variable} flex flex-col items-center justify-center`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
