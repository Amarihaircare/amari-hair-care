"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const name = pathname.split("/")[1].replace(/-/g, " ");

  return (
    <div className="w-full bg-white pt-10 flex flex-col items-center justify-center">
      <div className="w-full flex items-center gap-2 text-gray-500  md:max-w-screen-sm px-4 xl:max-w-screen-lg 2xl:max-w-screen-xl">
        <Link
          href="/"
          className="text-green-700 flex items-center gap-2 font-semibold border-b-2 border-green-700 pb-2"
        >
          <span>Home</span>
          <span>/</span>
        </Link>
        <Link href={pathname} className="capitalize font-semibold pb-2">
          {name}
        </Link>
      </div>
    </div>
  );
}
