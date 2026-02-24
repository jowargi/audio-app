import { useCallback, useReducer, useRef } from "react";
import {
  useGetReviewsByHeadphoneIdQuery,
  type Review,
} from "../redux/api/reviews/api";
import type { Headphone } from "../redux/slices/headphones/slice";
import type { AnyAction } from "@reduxjs/toolkit";
import { useAuthorizedUserIdContext } from "../components/authorizedUserIdContextProvider/AuthorizedUserIdContextProvider";
import { useSelector } from "react-redux";
import type { GlobalState } from "../redux/store";
import {
  selectAuthorizedUserById,
  type User,
} from "../redux/slices/authorizedUsers/slice";

export interface EditFormState {
  text: Review["text"];
  rating: Review["rating"];
}

interface UseEditReviewFormReturn {
  editFormState: EditFormState;
  setText: (text: EditFormState["text"]) => void;
  incrementRating: () => void;
  decrementRating: () => void;
  clear: () => void;
}

const SET_TEXT_ACTION = "setText";
const INCREMENT_RATING_ACTION = "incrementRating";
const DECREMENT_RATING_ACTION = "decrementRating";
const CLEAR_ACTION = "clear";

export const useEditReviewForm = (
  headphoneId: Headphone["id"],
  reviewId: Review["id"],
): UseEditReviewFormReturn => {
  const { data: review } = useGetReviewsByHeadphoneIdQuery(headphoneId, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data?.find(
        (review: Review): boolean => review.id === reviewId,
      ),
    }),
  });

  const INITIAL_EDIT_FORM_STATE_REF = useRef<EditFormState>(null!);

  INITIAL_EDIT_FORM_STATE_REF.current = {
    text: review?.text || "",
    rating: review?.rating || 1,
  };

  const reducer = useCallback(
    (prevState: EditFormState, { type, payload }: AnyAction): EditFormState => {
      switch (type) {
        case SET_TEXT_ACTION:
          return { ...prevState, text: payload };

        case INCREMENT_RATING_ACTION:
          return { ...prevState, rating: Math.min(prevState.rating + 1, 5) };

        case DECREMENT_RATING_ACTION:
          return { ...prevState, rating: Math.max(prevState.rating - 1, 1) };

        case CLEAR_ACTION:
          return { ...INITIAL_EDIT_FORM_STATE_REF.current };

        default:
          return prevState;
      }
    },
    [],
  );

  const [editFormState, dispatch] = useReducer(
    reducer,
    INITIAL_EDIT_FORM_STATE_REF.current,
  );

  const { authorizedUserId } = useAuthorizedUserIdContext();

  const authorizedUser = useSelector((state: GlobalState): User | undefined =>
    selectAuthorizedUserById(state, authorizedUserId),
  );

  const safeDispatch = useCallback(
    (action: AnyAction): void => {
      if (!authorizedUser) return;

      return dispatch(action);
    },
    [authorizedUser],
  );

  const setText = useCallback(
    (text: EditFormState["text"]): void =>
      safeDispatch({ type: SET_TEXT_ACTION, payload: text }),
    [safeDispatch],
  );

  const incrementRating = useCallback(
    (): void => safeDispatch({ type: INCREMENT_RATING_ACTION }),
    [safeDispatch],
  );

  const decrementRating = useCallback(
    (): void => safeDispatch({ type: DECREMENT_RATING_ACTION }),
    [safeDispatch],
  );

  const clear = useCallback(
    (): void => safeDispatch({ type: CLEAR_ACTION }),
    [safeDispatch],
  );

  return { editFormState, setText, incrementRating, decrementRating, clear };
};
