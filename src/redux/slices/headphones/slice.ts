import {
  createEntityAdapter,
  createSlice,
  type EntityState,
} from "@reduxjs/toolkit";
import { getHeadphones } from "./getHeadphones";
import type { GlobalState } from "../../store";
import { z } from "zod";
import { getHeadphoneById } from "./getHeadphoneById";

export const headphoneSchema = z.object({
  name: z.string(),
  id: z.string(),
  type: z.string(),
  maxVolume: z.string(),
  brand: z.string(),
  reviews: z.array(z.string()),
  codecs: z.array(z.string()),
});

export const headphonesArraySchema = z.array(headphoneSchema);

export type Headphone = z.infer<typeof headphoneSchema>;

export type FetchError = Error | { name: string; message: string } | undefined;

interface AdditionalState {
  fetchAllError: FetchError;
  fetchByIdError: FetchError;
}

type HeadphonesState = EntityState<Headphone, string> & AdditionalState;

const headphonesAdapter = createEntityAdapter<Headphone, string>({
  selectId: (headphone: Headphone): string => headphone.id,
});

const initialState: HeadphonesState = {
  ...headphonesAdapter.getInitialState(),
  fetchAllError: undefined,
  fetchByIdError: undefined,
};

export const headphonesSlice = createSlice({
  name: "headphones",
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
      .addCase(getHeadphones.pending, (state) => {
        state.fetchAllError = undefined;
      })
      .addCase(getHeadphones.fulfilled, (state, { payload }) => {
        state.fetchAllError = undefined;

        headphonesAdapter.addMany(state, payload);
      })
      .addCase(getHeadphones.rejected, (state, { payload, error }) => {
        state.fetchAllError = (payload || error) as FetchError;
      })
      .addCase(getHeadphoneById.pending, (state) => {
        state.fetchByIdError = undefined;
      })
      .addCase(getHeadphoneById.fulfilled, (state, { payload }) => {
        state.fetchByIdError = undefined;

        headphonesAdapter.addOne(state, payload);
      })
      .addCase(getHeadphoneById.rejected, (state, { payload, error }) => {
        state.fetchByIdError = (payload || error) as FetchError;
      });
  },

  selectors: {
    selectHeadphoneById: (
      state: HeadphonesState,
      id: string | undefined,
    ): Headphone | undefined => (id ? state.entities[id] : undefined),

    selectFetchAllError: (state: HeadphonesState): FetchError =>
      state.fetchAllError,

    selectFetchByIdError: (state: HeadphonesState): FetchError =>
      state.fetchByIdError,

    selectAllErrors: (
      state: HeadphonesState,
    ): {
      fetchAllError: FetchError;
      fetchByIdError: FetchError;
    } => ({
      fetchAllError: state.fetchAllError,
      fetchByIdError: state.fetchByIdError,
    }),
  },
});

export const { resetFetchAllError, resetFetchByIdError, resetAllErrors } =
  headphonesSlice.actions;

export const {
  selectHeadphoneById,
  selectFetchAllError,
  selectFetchByIdError,
  selectAllErrors,
} = headphonesSlice.selectors;

export const {
  selectIds: selectHeadphonesIds,
  selectAll: selectHeadphones,
  selectTotal: selectHeadphonesTotal,
} = headphonesAdapter.getSelectors(
  (globalState: GlobalState): HeadphonesState =>
    globalState[headphonesSlice.name],
);
