import { cn } from "@/lib/utils";

interface SlidesPaginationProps {
  length: number;
  activeSlide: number;
  handleDotClick: (index: number) => void;
}

export default function SlidesPagination({
  length,
  activeSlide,
  handleDotClick,
}: SlidesPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: length }, (_, index) => (
        <button
          role="button"
          type="button"
          aria-label="change slide"
          onClick={() => handleDotClick(index)}
          key={index}
          className={cn(" w-3 h-3 rounded-full bg-secondary", {
            "bg-primary": index === activeSlide,
          })}
        />
      ))}
    </div>
  );
}
