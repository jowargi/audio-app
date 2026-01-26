import {
  createEntityAdapter,
  createSlice,
  type EntityState,
} from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
}

const authorizedUsersAdapter = createEntityAdapter({
  selectId: (user: User): string => user.id,
});

export const authorizedUsersSlice = createSlice({
  name: "authorizedUsers",
  initialState: authorizedUsersAdapter.getInitialState(),

  reducers: {
    addAuthorizedUser: (
      state: EntityState<User, string>,
      { payload }: { payload: User },
    ): void => {
      authorizedUsersAdapter.addOne(state, payload);
    },
  },

  selectors: {
    selectAuthorizedUserById: (
      state: EntityState<User, string>,
      id: string | undefined,
    ): User | undefined => (id ? state.entities[id] : undefined),
  },
});

export const { addAuthorizedUser } = authorizedUsersSlice.actions;

export const { selectAuthorizedUserById } = authorizedUsersSlice.selectors;
