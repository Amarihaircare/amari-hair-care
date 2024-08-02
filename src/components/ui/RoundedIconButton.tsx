import { cn } from "@/lib/utils";

interface RoundedIconButtonProps {
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function RoundedIconButton({
  icon,
  className,
  onClick,
}: RoundedIconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "header_user-action flex h-10 w-10 items-center justify-center rounded-full bg-secondary",
        className,
      )}
    >
      {icon}
    </button>
  );
}
