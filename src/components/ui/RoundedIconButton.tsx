import { cn } from "@/lib/utils";

interface RoundedIconButtonProps {
  icon: React.ReactNode;
  className?: string;
}

export default function RoundedIconButton({
  icon,
  className,
}: RoundedIconButtonProps) {
  return (
    <button
      className={cn(
        "header_user-action bg-secondary flex items-center justify-center rounded-full w-10 h-10",
        className
      )}
    >
      {icon}
    </button>
  );
}
