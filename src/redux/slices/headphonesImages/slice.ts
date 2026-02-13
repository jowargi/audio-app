import {
  createEntityAdapter,
  createSlice,
  type EntityState,
} from "@reduxjs/toolkit";
import { z } from "zod";
import { getHeadphonesImages } from "./getHeadphonesImages";
import type { GlobalState } from "../../store";
import type { Headphone } from "../headphones/slice";
import { getHeadphoneImageById } from "./getHeadphoneImageById";

export const headphoneImageSchema = z.object({
  id: z.string(),
  blob: z.instanceof(Blob),
});

export const headphonesImagesArraySchema = z.array(headphoneImageSchema);

export type HeadphoneImage = z.infer<typeof headphoneImageSchema>;

export type FetchError = Error | { name: string; message: string } | undefined;

interface AdditionalState {
  fetchAllError: FetchError;
  fetchByIdError: FetchError;
}

type HeadphonesImagesState = EntityState<HeadphoneImage, HeadphoneImage["id"]> &
  AdditionalState;

const headphonesImagesAdapter = createEntityAdapter<
  HeadphoneImage,
  HeadphoneImage["id"]
>({
  selectId: (headphoneImage: HeadphoneImage): HeadphoneImage["id"] =>
    headphoneImage.id,
});

const initialState: HeadphonesImagesState = {
  ...headphonesImagesAdapter.getInitialState(),
  fetchAllError: undefined,
  fetchByIdError: undefined,
};

export const headphonesImagesSlice = createSlice({
  name: "headphonesImages",
  initialState,

  reducers: {
    resetFetchAllError: (state) => {
      state.fetchAllError = undefined;
    },

    resetFetchByIdError: (state) => {
      state.fetchByIdError = undefined;
    },

    resetAllErrors: (state) => {
      state.fetchAllError = undefined;
      state.fetchByIdError = undefined;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getHeadphonesImages.pending, (state) => {
        state.fetchAllError = undefined;
      })
      .addCase(getHeadphonesImages.fulfilled, (state, { payload }) => {
        state.fetchAllError = undefined;

        headphonesImagesAdapter.addMany(state, payload);
      })
      .addCase(getHeadphonesImages.rejected, (state, { payload, error }) => {
        state.fetchAllError = (payload || error) as FetchError;
      })
      .addCase(getHeadphoneImageById.pending, (state) => {
        state.fetchByIdError = undefined;
      })
      .addCase(getHeadphoneImageById.fulfilled, (state, { payload }) => {
        state.fetchByIdError = undefined;

        headphonesImagesAdapter.addOne(state, payload);
      })
      .addCase(getHeadphoneImageById.rejected, (state, { payload, error }) => {
        state.fetchByIdError = (payload || error) as FetchError;
      });
  },

  selectors: {
    selectHeadphoneImageById: (
      state: HeadphonesImagesState,
      id: Headphone["id"] | undefined,
    ): HeadphoneImage | undefined => (id ? state.entities[id] : undefined),

    selectFetchAllError: (state: HeadphonesImagesState): FetchError =>
      state.fetchAllError,

    selectFetchByIdError: (state: HeadphonesImagesState): FetchError =>
      state.fetchByIdError,

    selectAllErrors: (
      state: HeadphonesImagesState,
    ): { fetchAllError: FetchError; fetchByIdError: FetchError } => ({
      fetchAllError: state.fetchAllError,
      fetchByIdError: state.fetchByIdError,
    }),
  },
});

export const { resetFetchAllError, resetFetchByIdError, resetAllErrors } =
  headphonesImagesSlice.actions;

export const {
  selectHeadphoneImageById,
  selectFetchAllError,
  selectFetchByIdError,
  selectAllErrors,
} = headphonesImagesSlice.selectors;

export const {
  selectIds: selectHeadphonesImagesIds,
  selectAll: selectHeadphonesImages,
  selectTotal: selectHeadphonesImagesTotal,
} = headphonesImagesAdapter.getSelectors(
  (globalState: GlobalState): HeadphonesImagesState =>
    globalState[headphonesImagesSlice.name],
);
