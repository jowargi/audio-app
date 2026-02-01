import {
  createEntityAdapter,
  createSlice,
  type EntityState,
} from "@reduxjs/toolkit";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const usersArraySchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;

const authorizedUsersAdapter = createEntityAdapter<User, string>({
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
