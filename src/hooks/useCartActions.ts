import { useDispatch, useSelector } from "react-redux";
import type { User } from "../redux/slices/authorizedUsers/slice";
import type { Headphone } from "../redux/slices/headphones/slice";
import type { GlobalState } from "../redux/store";
import {
  addToCart,
  removeFromCart,
  selectUserCartItemQuantity,
} from "../redux/cart/slice";
import { useCallback } from "react";

interface UseCartActionsParams {
  userId: User["id"];
  headphoneId: Headphone["id"];
}

interface UseCartActionsReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCartActions = ({
  userId,
  headphoneId,
}: UseCartActionsParams): UseCartActionsReturn => {
  const dispatch = useDispatch();

  const count = useSelector((state: GlobalState): number =>
    selectUserCartItemQuantity(state, userId, headphoneId),
  );

  const increment = useCallback((): void => {
    dispatch(addToCart({ userId, headphoneId }));
  }, [dispatch, userId, headphoneId]);

  const decrement = useCallback((): void => {
    dispatch(removeFromCart({ userId, headphoneId }));
  }, [dispatch, userId, headphoneId]);

  return { count, increment, decrement };
};
