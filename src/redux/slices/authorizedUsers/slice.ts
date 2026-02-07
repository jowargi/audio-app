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

const authorizedUsersAdapter = createEntityAdapter<User, User["id"]>({
  selectId: (user: User): User["id"] => user.id,
});

export const authorizedUsersSlice = createSlice({
  name: "authorizedUsers",
  initialState: authorizedUsersAdapter.getInitialState(),

  reducers: {
    addAuthorizedUser: (state, { payload }) => {
      authorizedUsersAdapter.addOne(state, payload as User);
    },
  },

  selectors: {
    selectAuthorizedUserById: (
      state: EntityState<User, User["id"]>,
      id: User["id"] | undefined,
    ): User | undefined => (id ? state.entities[id] : undefined),
  },
});

export const { addAuthorizedUser } = authorizedUsersSlice.actions;

export const { selectAuthorizedUserById } = authorizedUsersSlice.selectors;
