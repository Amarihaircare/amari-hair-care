import { StarIcon } from "lucide-react";

interface RatingProps {
  value: number;
}

export default function Rating({ value }: RatingProps) {
  return (
    <ul className="main_rating-stars flex items-center accent">
      {Array.from({ length: 5 }, (_, index) => (
        <li className="main_rating-stars_star text-xl" key={index}>
          <StarIcon
            fill={index < value ? "#FFC107" : "#E0E0E0"}
            stroke={index < value ? "#FFC107" : "#E0E0E0"}
          />
        </li>
      ))}
    </ul>
  );
}
