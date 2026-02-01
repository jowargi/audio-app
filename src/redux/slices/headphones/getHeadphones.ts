import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpError } from "../../../errors/HttpError";
import {
  headphonesArraySchema,
  selectHeadphonesTotal,
  type Headphone,
} from "./slice";
import { APIError } from "../../../errors/APIError";
import type { GlobalState } from "../../store";

export const getHeadphones = createAsyncThunk<Headphone[], void>(
  "headphones/getHeadphones",

  async (_, { rejectWithValue, signal }) => {
    const headphonesResponse = await fetch(
      "http://localhost:3001/api/products",
      {
        signal,
      },
    );

    if (!headphonesResponse.ok)
      return rejectWithValue(new HttpError(headphonesResponse.status));

    const unvalidatedHeadphones: unknown = await headphonesResponse.json();

    const validationResult = headphonesArraySchema.safeParse(
      unvalidatedHeadphones,
    );

    if (!validationResult.success)
      return rejectWithValue(new APIError(validationResult.error.message));

    const headphones = validationResult.data as Headphone[];

    if (!headphones.length)
      return rejectWithValue(new APIError("Headphones not found"));

    return headphones;
  },

  {
    condition: (_, { getState }) =>
      !selectHeadphonesTotal(getState() as GlobalState),
    dispatchConditionRejection: true,
  },
);
