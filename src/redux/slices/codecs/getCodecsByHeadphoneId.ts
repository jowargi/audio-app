import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  codecsArraySchema,
  selectCodecsIdsByHeadphoneId,
  type Codec,
} from "./slice";
import type { Headphone } from "../headphones/slice";
import { HttpError } from "../../../errors/HttpError";
import { APIError } from "../../../errors/APIError";
import type { GlobalState } from "../../store";

export const getCodecsByHeadphoneId = createAsyncThunk<
  Codec[],
  Headphone["id"]
>(
  "codecs/getCodecsByHeadphoneId",

  async (headphoneId, { rejectWithValue, signal }) => {
    const codecsResponse = await fetch(
      `http://localhost:3001/api/codecs?productId=${headphoneId}`,
      { signal },
    );

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
    condition: (headphoneId, { getState }) =>
      !selectCodecsIdsByHeadphoneId(getState() as GlobalState, headphoneId)
        ?.length,
    dispatchConditionRejection: true,
  },
);
