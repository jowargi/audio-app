import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../slices/authorizedUsers/slice";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
