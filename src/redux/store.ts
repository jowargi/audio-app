import { configureStore } from "@reduxjs/toolkit";
import { authorizedUsersSlice } from "./slices/authorizedUsers/slice";
import { headphonesSlice } from "./slices/headphones/slice";
import { requestsSlice } from "./slices/requests/slice";
import { codecsSlice } from "./slices/codecs/slice";
import { cartSlice } from "./slices/cart/slice";
import { headphonesImagesSlice } from "./slices/headphonesImages/slice";
import { reviewsApi } from "./api/reviews/api";
import { usersApi } from "./api/users/api";

export const store = configureStore({
  reducer: {
    [requestsSlice.name]: requestsSlice.reducer,
    [authorizedUsersSlice.name]: authorizedUsersSlice.reducer,
    [headphonesSlice.name]: headphonesSlice.reducer,
    [codecsSlice.name]: codecsSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [headphonesImagesSlice.name]: headphonesImagesSlice.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
      actionCreatorCheck: false,
    }).concat(reviewsApi.middleware, usersApi.middleware),
});

export type GlobalState = ReturnType<typeof store.getState>;
export type GlobalDispatch = typeof store.dispatch;
