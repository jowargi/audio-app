import { configureStore } from "@reduxjs/toolkit";
import { authorizedUsersSlice } from "./slices/authorizedUsers/slice";
import { headphonesSlice } from "./slices/headphones/slice";
import { requestsSlice } from "./slices/requests/slice";
import { codecsSlice } from "./slices/codecs/slice";
import { cartSlice } from "./cart/slice";

export const store = configureStore({
  reducer: {
    [requestsSlice.name]: requestsSlice.reducer,
    [authorizedUsersSlice.name]: authorizedUsersSlice.reducer,
    [headphonesSlice.name]: headphonesSlice.reducer,
    [codecsSlice.name]: codecsSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
      actionCreatorCheck: false,
    }),
});

export type GlobalState = ReturnType<typeof store.getState>;
export type GlobalDispatch = typeof store.dispatch;
