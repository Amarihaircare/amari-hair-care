import { cn } from "@/lib/utils";

interface RoundedIconButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  className?: string;
}

export default function RoundedIconButton({
  icon,
  className,
  onClick,
  ...props
}: RoundedIconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "header_user-action flex h-10 w-10 items-center justify-center rounded-full bg-secondary",
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
