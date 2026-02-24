import { useCallback, type FC, type FormEvent } from "react";
import type { ReviewListItemContentProps } from "../components/reviewListItemContent/ReviewListItemContent";
import type { ReviewFormProps } from "../components/reviewForm/ReviewForm";
import { useReviewContentContext } from "../components/reviewListItem/ReviewListItemContainer";
import { useAuthorizedUserIdContext } from "../components/authorizedUserIdContextProvider/AuthorizedUserIdContextProvider";
import Button from "../components/button/Button";
import { useEditReviewForm } from "../hooks/useEditReviewForm";
import {
  useEditReviewByIdMutation,
  type Review,
} from "../redux/api/reviews/api";
import { useParams } from "react-router-dom";
import type { Headphone } from "../redux/slices/headphones/slice";
import { useReviewEditingMode } from "../hooks/useReviewEditingMode";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const withEditableReview = <P extends object = {}>({
  ReviewListItemContent,
  ReviewForm,
}: {
  ReviewListItemContent?: FC<P & ReviewListItemContentProps>;
  ReviewForm?: FC<P & ReviewFormProps>;
}): FC<P> => {
  return function WithEditableReview(props: P) {
    const { headphoneId } = useParams();

    const { reviewId, userId, reviewText, reviewRating } =
      useReviewContentContext();

    const { authorizedUserId } = useAuthorizedUserIdContext();

    const { editFormState, setText, incrementRating, decrementRating, clear } =
      useEditReviewForm(
        headphoneId as Headphone["id"],
        reviewId as Review["id"],
      );

    const [editReviewById, { isLoading }] = useEditReviewByIdMutation();

    const { isEditing, startEditing, stopEditing } = useReviewEditingMode();

    const onSubmit = async (event: FormEvent): Promise<void> => {
      event.preventDefault();

      if (!editFormState.text.trim()) return;

      try {
        await editReviewById({
          reviewId: reviewId as Review["id"],
          review: { ...editFormState },
          headphoneId: headphoneId as Headphone["id"],
        }).unwrap();
      } catch {
        clear();
      } finally {
        stopEditing();
      }
    };

    const onClear = useCallback((): void => {
      clear();
      stopEditing();
    }, [clear, stopEditing]);

    if (userId === authorizedUserId && isEditing) {
      return ReviewForm ? (
        <ReviewForm
          {...props}
          formState={editFormState}
          setText={setText}
          incrementRating={incrementRating}
          decrementRating={decrementRating}
          onSubmit={onSubmit}
          onClear={onClear}
          disabled={isLoading}
        />
      ) : null;
    }

    return ReviewListItemContent ? (
      <>
        <ReviewListItemContent
          {...props}
          userId={userId}
          reviewText={reviewText}
          reviewRating={reviewRating}
        />
        {userId === authorizedUserId && !isEditing ? (
          <Button onClick={startEditing}>Edit</Button>
        ) : null}
      </>
    ) : null;
  };
};
