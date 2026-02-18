import { useParams } from "react-router-dom";
import {
  useGetReviewsByHeadphoneIdQuery,
  type Review,
} from "../../redux/api/reviews/api";
import type { Headphone } from "../../redux/slices/headphones/slice";
import Reviews from "./Reviews";

export default function ReviewsContainer() {
  const { headphoneId } = useParams();

  const { data: reviewsIds } = useGetReviewsByHeadphoneIdQuery(
    headphoneId as Headphone["id"],
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data?.map((review: Review): Review["id"] => review.id),
      }),
    },
  );

  return reviewsIds ? <Reviews reviewsIds={reviewsIds} /> : null;
}
