import { useParams } from "react-router-dom";
import {
  useGetReviewsByHeadphoneIdQuery,
  type Review,
} from "../../redux/api/reviews/api";
import type { Headphone } from "../../redux/slices/headphones/slice";
import { createContext, useContext } from "react";
import ReviewListItem from "./ReviewListItem";

interface ReviewContentContextValue {
  userId: Review["user"] | undefined;
  reviewText: Review["text"] | undefined;
  reviewRating: Review["rating"] | undefined;
}

const ReviewContentContext = createContext<ReviewContentContextValue>({
  userId: undefined,
  reviewText: undefined,
  reviewRating: undefined,
});

export const useReviewContentContext = (): ReviewContentContextValue =>
  useContext(ReviewContentContext);

export default function ReviewListItemContainer({
  reviewId,
}: {
  reviewId: Review["id"];
}) {
  const { headphoneId } = useParams();

  const { data: review } = useGetReviewsByHeadphoneIdQuery(
    headphoneId as Headphone["id"],
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data?.find(
          (review: Review): boolean => review.id === reviewId,
        ),
      }),
    },
  );

  const { user: userId, text: reviewText, rating: reviewRating } = review || {};

  return userId && reviewText && reviewRating ? (
    <ReviewContentContext.Provider value={{ userId, reviewText, reviewRating }}>
      <ReviewListItem />
    </ReviewContentContext.Provider>
  ) : null;
}
