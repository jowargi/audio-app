import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  headphoneImageSchema,
  selectHeadphoneImageById,
  type HeadphoneImage,
} from "./slice";
import { headphoneSchema, type Headphone } from "../headphones/slice";
import { HttpError } from "../../../errors/HttpError";
import { APIError } from "../../../errors/APIError";
import type { GlobalState } from "../../store";

export const getHeadphoneImageById = createAsyncThunk<
  HeadphoneImage,
  Headphone["id"]
>(
  "headphonesImages/getHeadphoneImageById",

  async (id, { rejectWithValue, signal }) => {
    const headphoneResponse = await fetch(
      `http://localhost:3001/api/product/${id}`,
      { signal },
    );

    if (!headphoneResponse.ok)
      return rejectWithValue(new HttpError(headphoneResponse.status));

    const unvalidatedHeadphone: unknown = await headphoneResponse.json();

    const headphoneValidationResult =
      headphoneSchema.safeParse(unvalidatedHeadphone);

    if (!headphoneValidationResult.success)
      return rejectWithValue(
        new APIError(headphoneValidationResult.error.message),
      );

    const headphone: Headphone = headphoneValidationResult.data;

    const imageResponse = await fetch(headphone.img, { signal });

    if (!imageResponse.ok)
      return rejectWithValue(new HttpError(imageResponse.status));

    const image = await imageResponse.blob();

    const unvalidatedHeadphoneImage = {
      id: headphone.id,
      blob: image,
    } as HeadphoneImage;

    const headphoneImageValidationResult = headphoneImageSchema.safeParse(
      unvalidatedHeadphoneImage,
    );

    if (!headphoneImageValidationResult.success)
      return rejectWithValue(
        new APIError(headphoneImageValidationResult.error.message),
      );

    const headphoneImage: HeadphoneImage = headphoneImageValidationResult.data;

    return headphoneImage;
  },

  {
    condition: (id, { getState }) =>
      !selectHeadphoneImageById(getState() as GlobalState, id),
    dispatchConditionRejection: true,
  },
);
