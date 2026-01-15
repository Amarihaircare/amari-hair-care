import BreadCrumbs from "@/components/shared/BreadCrumbs";
import OtherPageHero from "@/components/shared/OtherPageHero";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OtherPageHero />
      <BreadCrumbs />
      {children}
    </>
  );
}
