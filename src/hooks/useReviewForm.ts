import { useCallback, useReducer } from "react";
import type { Review } from "../redux/api/reviews/api";
import type { AnyAction } from "@reduxjs/toolkit";
import { useAuthorizedUserIdContext } from "../components/authorizedUserIdContextProvider/AuthorizedUserIdContextProvider";
import { useSelector } from "react-redux";
import type { GlobalState } from "../redux/store";
import {
  selectAuthorizedUserById,
  type User,
} from "../redux/slices/authorizedUsers/slice";

export interface FormState {
  text: Review["text"];
  rating: Review["rating"];
}

interface UseReviewFormReturn {
  formState: FormState;
  setText: (text: FormState["text"]) => void;
  incrementRating: () => void;
  decrementRating: () => void;
  clear: () => void;
}

const INITIAL_FORM_STATE: FormState = { text: "", rating: 1 };

const SET_TEXT_ACTION = "setText";
const INCREMENT_RATING_ACTION = "incrementRating";
const DECREMENT_RATING_ACTION = "decrementRating";
const CLEAR_ACTION = "clear";

const reducer = (
  prevState: FormState,
  { type, payload }: AnyAction,
): FormState => {
  switch (type) {
    case SET_TEXT_ACTION:
      return { ...prevState, text: payload };

    case INCREMENT_RATING_ACTION:
      return { ...prevState, rating: Math.min(prevState.rating + 1, 5) };

    case DECREMENT_RATING_ACTION:
      return { ...prevState, rating: Math.max(prevState.rating - 1, 1) };

    case CLEAR_ACTION:
      return { ...INITIAL_FORM_STATE };

    default:
      return prevState;
  }
};

export const useReviewForm = (): UseReviewFormReturn => {
  const [formState, dispatch] = useReducer(reducer, INITIAL_FORM_STATE);

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
    (text: FormState["text"]): void =>
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

  return { formState, setText, incrementRating, decrementRating, clear };
};
