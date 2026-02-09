import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { User } from "../slices/authorizedUsers/slice";
import type { Headphone } from "../slices/headphones/slice";
import type { Action } from "@reduxjs/toolkit";
import type { GlobalState } from "../store";

interface CartState {
  byUserId: Record<User["id"], Record<Headphone["id"], number>>;
  usersIds: User["id"][];
}

const initialState: CartState = {
  byUserId: {},
  usersIds: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (
      state: CartState,
      action: Action & {
        payload: { userId: User["id"]; headphoneId: Headphone["id"] };
      },
    ): void => {
      const { userId, headphoneId } = action.payload;

      if (!state.usersIds.includes(userId)) {
        state.byUserId[userId] = {};

        state.usersIds.push(userId);
      }

      state.byUserId[userId][headphoneId] =
        (state.byUserId[userId][headphoneId] || 0) + 1;
    },

    removeFromCart: (
      state: CartState,
      action: Action & {
        payload: { userId: User["id"]; headphoneId: Headphone["id"] };
      },
    ): CartState | undefined => {
      const { userId, headphoneId } = action.payload;

      if (!state.byUserId[userId]?.[headphoneId]) return state;

      state.byUserId[userId][headphoneId] -= 1;

      if (state.byUserId[userId][headphoneId] <= 0)
        delete state.byUserId[userId][headphoneId];
    },
  },

  selectors: {
    selectUserCartItemQuantity: (
      state: CartState,
      userId: User["id"] | undefined,
      headphoneId: Headphone["id"] | undefined,
    ): number =>
      userId && headphoneId ? state.byUserId[userId]?.[headphoneId] || 0 : 0,

    selectCartUsersIds: (state: CartState): User["id"][] => state.usersIds,
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const { selectUserCartItemQuantity, selectCartUsersIds } =
  cartSlice.selectors;

export const selectUserCartItemsIds = createSelector(
  [
    (
      state: GlobalState,
      userId: User["id"] | undefined,
    ): Record<Headphone["id"], number> | undefined =>
      userId ? state[cartSlice.name].byUserId[userId] : undefined,
  ],
  (userCart: Record<Headphone["id"], number> | undefined): Headphone["id"][] =>
    userCart ? Object.keys(userCart) : [],
);
