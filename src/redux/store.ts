import { configureStore } from "@reduxjs/toolkit";
import { authorizedUsersSlice } from "./slices/authorizedUsers/slice";

export const store = configureStore({
  reducer: {
    [authorizedUsersSlice.name]: authorizedUsersSlice.reducer,
  },
});

export type GlobalState = ReturnType<typeof store.getState>;
