import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  headphonesImagesArraySchema,
  selectHeadphonesImagesTotal,
  type HeadphoneImage,
} from "./slice";
import { HttpError } from "../../../errors/HttpError";
import { headphonesArraySchema, type Headphone } from "../headphones/slice";
import { APIError } from "../../../errors/APIError";
import type { GlobalState } from "../../store";

export const getHeadphonesImages = createAsyncThunk<HeadphoneImage[], void>(
  "headphonesImages/getHeadphonesImages",

  async (_, { rejectWithValue, signal }) => {
    const headphonesResponse = await fetch(
      "http://localhost:3001/api/products",
      { signal },
    );

    if (!headphonesResponse.ok)
      return rejectWithValue(new HttpError(headphonesResponse.status));

    const unvalidatedHeadphones: unknown = await headphonesResponse.json();

    const headphonesValidationResult = headphonesArraySchema.safeParse(
      unvalidatedHeadphones,
    );

    if (!headphonesValidationResult.success)
      return rejectWithValue(
        new APIError(headphonesValidationResult.error.message),
      );

    const headphones: Headphone[] = headphonesValidationResult.data;

    if (!headphones.length)
      return rejectWithValue(new APIError("Headphones not found"));

    const imagesResponses = await Promise.all(
      headphones.map(
        (headphone: Headphone): Promise<Response> =>
          fetch(headphone.img, { signal }),
      ),
    );

    const failedImageResponse = imagesResponses.find(
      (imageResponse: Response): boolean => !imageResponse.ok,
    );

    if (failedImageResponse)
      return rejectWithValue(new HttpError(failedImageResponse.status));

    const images = await Promise.all(
      imagesResponses.map(
        (imageResponse: Response): Promise<Blob> => imageResponse.blob(),
      ),
    );

    const unvalidatedHeadphonesImages = headphones.map(
      (headphone: Headphone, index: number): HeadphoneImage => ({
        id: headphone.id,
        blob: images[index],
      }),
    );

    const headphonesImagesValidationResult =
      headphonesImagesArraySchema.safeParse(unvalidatedHeadphonesImages);

    if (!headphonesImagesValidationResult.success)
      return rejectWithValue(
        new APIError(headphonesImagesValidationResult.error.message),
      );

    const headphonesImages: HeadphoneImage[] =
      headphonesImagesValidationResult.data;

    return headphonesImages;
  },

  {
    condition: (_, { getState }) =>
      !selectHeadphonesImagesTotal(getState() as GlobalState),
    dispatchConditionRejection: true,
  },
);
