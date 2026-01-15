"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { buttonVariants } from "@/components/ui/button";
import ChatWidget from "./ChatWidget";

declare global {
  interface Window {
    $zoho?: any;
  }
}
export default function NewHeroSection() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden lg:pt-10 pb-20 lg:min-h-[800px] lg:pb-0">
      <div className="container mx-auto flex flex-col items-center gap-10 px-6 lg:flex-row lg:gap-24">
        {/* Heading First (on all screen sizes) */}
        <div className="hero_content-header flex flex-col items-center gap-4 pt-10 lg:items-start lg:pt-0">
          <h1 className="hero_content-header_title mb-4 text-center text-3xl font-black leading-[1.2] lg:max-w-[560px] lg:text-left lg:text-6xl">
            Fewer Products. <br />
            Less Stress. <br />
            More Growth.
          </h1>

          <Button asChild>
            <Link
              href="/catalogue"
              className={`${buttonVariants({
                variant: "secondary",
              })} mt-4 px-6 py-6 font-semibold hover:bg-[#C6E749]/80`}
            >
              Find Your Amari
            </Link>
          </Button>
        </div>

        {/* Chat Widget Second */}
        <div className="flex flex-1 items-center justify-center lg:justify-end">
           <ChatWidget />

           <Script id="zoho-init" strategy="beforeInteractive">
        {`
          window.$zoho = window.$zoho || {};
          window.$zoho.salesiq = window.$zoho.salesiq || {
            ready: function() {}
          };
        `}
      </Script>

      {/* Load Zoho SalesIQ widget */}
      <Script
        id="zoho-salesiq"
        strategy="afterInteractive"
        src="https://salesiq.zohopublic.com/widget?wc=siqfb3939e7be5009598d9a93737e2c58647c39775ce16be1a743f7c0e42ca06162"
        onLoad={() => {
          // Hide the floating window initially so we only see our custom widget
          if (window.$zoho?.salesiq) {
            window.$zoho.salesiq.ready = function () {
              window.$zoho.salesiq.floatwindow.visible("hide");
            };
          }
        }}
      />

        </div>
      </div>
    </section>
  );
}
