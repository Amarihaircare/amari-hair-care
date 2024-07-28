import { cn } from "@/lib/utils";

interface BurgerButtonProps {
  handleClick: () => void;
  showNav: boolean;
}

export default function BurgerButton({
  handleClick,
  showNav,
}: BurgerButtonProps) {
  return (
    <button
      className="header_toggle lg:hidden w-6 h-6 flex flex-col justify-between"
      onClick={handleClick}
    >
      <div
        className={cn("block w-full h-1 rounded-full bg-black transition-all", {
          "rotate-45 translate-y-[12px]": showNav,
        })}
      />
      <div
        className={cn("block w-1/2 h-1 bg-black", {
          "opacity-0": showNav,
        })}
      />
      <div
        className={cn("block w-full h-1 bg-black transition-all", {
          "-rotate-45 translate-y-[-8px]": showNav,
        })}
      />
    </button>
  );
}
