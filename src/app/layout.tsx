import type { Metadata } from "next";
import { Nunito_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "aos/dist/aos.css"; // You can also use <link> for styles

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Amari Haircare",
  description:
    "Amari Hair Care and Amari Scalp Care integrate cutting-edge technology with natural ingredients sourced from Africa, offering premium, plant-based hair care products tailored for the 21st century.",
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
