import { TProduct } from "@/assets/data/products";
import Rating from "../ui/Rating";
import dayjs from "dayjs";
import en from "@/language/en";

interface ReviewsProps {
  reviews: TProduct["reviews"];
}
export default function Reviews({ reviews }: ReviewsProps) {
  return reviews.length > 0 ? (
    reviews.map((review, index) => {
      const date = dayjs(review.date).format("MMMM DD, YYYY");
      const time = dayjs(review.date).format("hh:mm A");
      return (
        <div
          key={index}
          className="flex flex-col gap-4 border-b border-gray-200 pb-4"
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{review.name}</h3>
              <Rating value={review.rating} />
            </div>
            <p className="text-sm font-semibold">
              {date} {time}
            </p>
          </div>
          <p>{review.review}</p>
          <button className="self-start border-b-2 border-b-green-700 pb-2 font-semibold text-green-700">
            {en.reply}
          </button>
        </div>
      );
    })
  ) : (
    <p className="text-center">{en.noReviews}</p>
  );
}
