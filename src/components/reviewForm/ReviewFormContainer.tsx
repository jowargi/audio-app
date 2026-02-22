import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type FormEventHandler,
  type MouseEventHandler,
} from "react";
import {
  withAuthorized,
  type AuthorizedComponentProps,
} from "../../hocs/withAuthorized";
import { useReviewForm, type FormState } from "../../hooks/useReviewForm";
import { useAddReviewByHeadphoneIdMutation } from "../../redux/api/reviews/api";
import ErrorFallback from "../errorFallback/ErrorFallback";
import { useParams } from "react-router-dom";
import { useTimeout } from "../../hooks/useTimeout";
import type { Headphone } from "../../redux/slices/headphones/slice";
import ReviewForm from "./ReviewForm";

interface ReviewFormContextValue {
  formState: FormState;
  setText: (text: string) => void;
  incrementRating: () => void;
  decrementRating: () => void;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onClear: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled: boolean | undefined;
}

const ReviewFormContext = createContext<ReviewFormContextValue>({
  formState: { text: "", rating: 1 },
  setText: (_text: string): void => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  incrementRating: (): void => {},
  decrementRating: (): void => {},
  onSubmit: undefined,
  onClear: undefined,
  disabled: undefined,
});

export const useReviewFormContext = (): ReviewFormContextValue =>
  useContext(ReviewFormContext);

const ReviewFormContainerAuthorized = ({
  authorizedUser,
}: AuthorizedComponentProps) => {
  const { formState, setText, incrementRating, decrementRating, clear } =
    useReviewForm();

  const [addReviewByHeadphoneId, { error, isLoading, isError, reset }] =
    useAddReviewByHeadphoneIdMutation({
      fixedCacheKey: "addReviewByRestaurantId",
    });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(
    (): (() => void) => (): void => {
      reset();
    },
    [reset],
  );

  const { headphoneId } = useParams();

  const { setTimer } = useTimeout();

  if (isError)
    return (
      <ErrorFallback
        name={"status" in error ? error.status.toString() : undefined}
        message={"error" in error ? error.error : undefined}
      />
    );

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!formState.text.trim()) return;

    setIsSubmitting(true);

    try {
      await addReviewByHeadphoneId({
        headphoneId: headphoneId as Headphone["id"],
        review: { user: authorizedUser.id, ...formState },
      }).unwrap();

      clear();
    } catch {
      setTimer((): void => {
        reset();
        clear();
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ReviewFormContext.Provider
      value={{
        formState,
        setText,
        incrementRating,
        decrementRating,
        onSubmit,
        onClear: clear,
        disabled: isLoading || isSubmitting,
      }}
    >
      <ReviewForm />
    </ReviewFormContext.Provider>
  );
};

const ReviewFormContainer = withAuthorized({
  AuthorizedComponent: ReviewFormContainerAuthorized,
});

export default ReviewFormContainer;
