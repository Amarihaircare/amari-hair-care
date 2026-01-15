import type { Metadata } from "next";
import { Nunito, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/shared/Footer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import "aos/dist/aos.css";
import en from "@/language/en";
import { CartProvider } from "@/components/context/CartProvider";
import { ModalProvider } from "@/components/context/ModalProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
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
      <body className={`${nunito.className} ${montserrat.className} flex flex-col items-center justify-center`}>
        <ModalProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </CartProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
