import { type FormEvent } from "react";
import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import { useReviewForm } from "../../hooks/useReviewForm";
import { useAddReviewByHeadphoneIdMutation } from "../../redux/api/reviews/api";
import { useParams } from "react-router-dom";
import type { Headphone } from "../../redux/slices/headphones/slice";
import ReviewForm from "./ReviewForm";

const ReviewFormContainerAuthorized = ({
  authorizedUser,
}: AuthorizedComponentProps) => {
  const { headphoneId } = useParams();

  const { formState, setText, incrementRating, decrementRating, clear } =
    useReviewForm();

  const [addReviewByHeadphoneId, { isLoading }] =
    useAddReviewByHeadphoneIdMutation();

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!formState.text.trim()) return;

    try {
      await addReviewByHeadphoneId({
        headphoneId: headphoneId as Headphone["id"],
        review: { user: authorizedUser.id, ...formState },
      }).unwrap();

      clear();
    } catch {
      clear();
    }
  };

  return (
    <ReviewForm
      formState={formState}
      setText={setText}
      incrementRating={incrementRating}
      decrementRating={decrementRating}
      onSubmit={onSubmit}
      onClear={clear}
      disabled={isLoading}
    />
  );
};

const ReviewFormContainer = withAuthorized({
  AuthorizedComponent: ReviewFormContainerAuthorized,
});

export default ReviewFormContainer;
