import { useParams } from "react-router-dom";
import { useGetReviewsByHeadphoneIdQuery } from "../../redux/api/reviews/api";
import {
  selectHeadphoneById,
  type Headphone,
} from "../../redux/slices/headphones/slice";
import ErrorFallback from "../../components/errorFallback/ErrorFallback";
import ReviewsPage from "./ReviewsPage";
import { useSelector } from "react-redux";
import type { GlobalState } from "../../redux/store";
import ReviewsPageSkeleton from "../../skeletons/reviewsPage/ReviewsPageSkeleton";

export default function ReviewsPageContainer() {
  const { headphoneId } = useParams();

  const { error, isLoading, isFetching, isError } =
    useGetReviewsByHeadphoneIdQuery(headphoneId as Headphone["id"]);

  const headphone = useSelector((state: GlobalState): Headphone | undefined =>
    selectHeadphoneById(state, headphoneId),
  );

  if (isLoading || isFetching) return <ReviewsPageSkeleton />;

  if (isError)
    return (
      <ErrorFallback
        name={"status" in error ? error.status.toString() : undefined}
        message={"error" in error ? error.error : undefined}
      />
    );

  const { name: headphoneName } = headphone || {};

  return <ReviewsPage headphoneName={headphoneName} />;
}
