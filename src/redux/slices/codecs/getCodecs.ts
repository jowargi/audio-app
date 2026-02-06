import { createAsyncThunk } from "@reduxjs/toolkit";
import { codecsArraySchema, selectCodecsTotal, type Codec } from "./slice";
import { HttpError } from "../../../errors/HttpError";
import { APIError } from "../../../errors/APIError";
import type { GlobalState } from "../../store";

export const getCodecs = createAsyncThunk<Codec[], void>(
  "codecs/getCodecs",

  async (_, { rejectWithValue, signal }) => {
    const codecsResponse = await fetch("http://localhost:3001/api/codecs", {
      signal,
    });

    if (!codecsResponse.ok)
      return rejectWithValue(new HttpError(codecsResponse.status));

    const unvalidatedCodecs = await codecsResponse.json();

    const validationResult = codecsArraySchema.safeParse(unvalidatedCodecs);

    if (!validationResult.success)
      return rejectWithValue(new APIError(validationResult.error.message));

    const codecs: Codec[] = validationResult.data;

    if (!codecs.length)
      return rejectWithValue(new APIError("Codecs not found"));

    return codecs;
  },

  {
    condition: (_, { getState }) =>
      !selectCodecsTotal(getState() as GlobalState),
    dispatchConditionRejection: true,
  },
);
