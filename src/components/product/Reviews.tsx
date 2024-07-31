import { TProduct } from "@/assets/data/products";
import Rating from "../ui/Rating";
import dayjs from "dayjs";
import Image from "next/image";
import en from "@/language/en";

interface ReviewsProps {
  reviews: TProduct["reviews"];
}
export default function Reviews({ reviews }: ReviewsProps) {
  return reviews.map((review, index) => {
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
        {!!review.images?.length && (
          <div className="flex gap-4">
            {review.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Review Image"
                width={100}
                height={100}
                className="w-[100px] h-[100px] object-cover rounded"
              />
            ))}
          </div>
        )}
        <button className="border-b-2 border-b-green-700 pb-2 text-green-700 font-semibold self-start">
          {en.reply}
        </button>
      </div>
    );
  });
}
