import { createAsyncThunk } from "@reduxjs/toolkit";
import { headphoneSchema, selectHeadphoneById, type Headphone } from "./slice";
import { HttpError } from "../../../errors/HttpError";
import { APIError } from "../../../errors/APIError";
import type { GlobalState } from "../../store";

export const getHeadphoneById = createAsyncThunk<Headphone, string>(
  "headphones/getHeadphoneById",

  async (id, { rejectWithValue, signal }) => {
    const headphoneResponse = await fetch(
      `http://localhost:3001/api/product/${id}`,
      { signal },
    );

    if (!headphoneResponse.ok)
      return rejectWithValue(new HttpError(headphoneResponse.status));

    const unvalidatedHeadphone: unknown = await headphoneResponse.json();

    const validationResult = headphoneSchema.safeParse(unvalidatedHeadphone);

    if (!validationResult.success)
      return rejectWithValue(new APIError(validationResult.error.message));

    const headphone = validationResult.data as Headphone;

    return headphone;
  },

  {
    condition: (id, { getState }) =>
      !selectHeadphoneById(getState() as GlobalState, id),
    dispatchConditionRejection: true,
  },
);
