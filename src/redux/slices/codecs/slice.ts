import {
  createEntityAdapter,
  createSelector,
  createSlice,
  type EntityState,
} from "@reduxjs/toolkit";
import { z } from "zod";
import { getCodecs } from "./getCodecs";
import type { GlobalState } from "../../store";
import type { Headphone } from "../headphones/slice";
import { getCodecsByHeadphoneId } from "./getCodecsByHeadphoneId";

export const codecSchema = z.object({ id: z.string(), type: z.string() });
export const codecsArraySchema = z.array(codecSchema);

export type Codec = z.infer<typeof codecSchema>;

export type FetchError = Error | { name: string; message: string } | undefined;

interface AdditionalState {
  codecsByHeadphoneId: {
    [headphoneId: Headphone["id"]]: {
      ids: Codec["id"][];
      entities: Record<Codec["id"], Codec>;
    };
  };
  fetchAllError: FetchError;
  fetchByHeadphoneIdError: FetchError;
}

type CodecsState = EntityState<Codec, Codec["id"]> & AdditionalState;

const codecsAdapter = createEntityAdapter<Codec, Codec["id"]>({
  selectId: (codec: Codec): Codec["id"] => codec.id,
});

const initialState: CodecsState = {
  ...codecsAdapter.getInitialState(),
  codecsByHeadphoneId: {},
  fetchAllError: undefined,
  fetchByHeadphoneIdError: undefined,
};

export const codecsSlice = createSlice({
  name: "codecs",
  initialState,

  reducers: {
    resetFetchAllError: (state) => {
      state.fetchAllError = undefined;
    },

    resetFetchByHeadphoneIdError: (state) => {
      state.fetchByHeadphoneIdError = undefined;
    },

    resetAllErrors: (state) => {
      state.fetchAllError = undefined;
      state.fetchByHeadphoneIdError = undefined;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getCodecs.pending, (state) => {
        state.fetchAllError = undefined;
      })
      .addCase(getCodecs.fulfilled, (state, { payload }) => {
        state.fetchAllError = undefined;

        codecsAdapter.addMany(state, payload);
      })
      .addCase(getCodecs.rejected, (state, { payload, error }) => {
        state.fetchAllError = (payload || error) as FetchError;
      })
      .addCase(getCodecsByHeadphoneId.pending, (state) => {
        state.fetchByHeadphoneIdError = undefined;
      })
      .addCase(getCodecsByHeadphoneId.fulfilled, (state, { payload, meta }) => {
        state.fetchByHeadphoneIdError = undefined;

        codecsAdapter.addMany(state, payload);

        state.codecsByHeadphoneId[meta.arg] = {
          ids: payload.map((codec: Codec): Codec["id"] => codec.id),
          entities: payload.reduce(
            (
              entities: Record<Codec["id"], Codec>,
              codec: Codec,
            ): Record<Codec["id"], Codec> => ({
              ...entities,
              [codec.id]: codec,
            }),
            {},
          ),
        };
      })
      .addCase(getCodecsByHeadphoneId.rejected, (state, { payload, error }) => {
        state.fetchByHeadphoneIdError = (payload || error) as FetchError;
      });
  },

  selectors: {
    selectCodecById: (
      state: CodecsState,
      id: Codec["id"] | undefined,
    ): Codec | undefined => (id ? state.entities[id] : undefined),

    selectCodecsIdsByHeadphoneId: (
      state: CodecsState,
      headphoneId: Headphone["id"] | undefined,
    ): Codec["id"][] | undefined =>
      headphoneId ? state.codecsByHeadphoneId[headphoneId]?.ids : undefined,

    selectFetchAllError: (state: CodecsState): FetchError =>
      state.fetchAllError,

    selectFetchByHeadphoneIdError: (state: CodecsState): FetchError =>
      state.fetchByHeadphoneIdError,

    selectAllErrors: (
      state: CodecsState,
    ): {
      fetchAllError: FetchError;
      fetchByHeadphoneIdError: FetchError;
    } => ({
      fetchAllError: state.fetchAllError,
      fetchByHeadphoneIdError: state.fetchByHeadphoneIdError,
    }),
  },
});

export const {
  resetFetchAllError,
  resetFetchByHeadphoneIdError,
  resetAllErrors,
} = codecsSlice.actions;

export const {
  selectCodecById,
  selectCodecsIdsByHeadphoneId,
  selectFetchAllError,
  selectFetchByHeadphoneIdError,
  selectAllErrors,
} = codecsSlice.selectors;

export const selectCodecsByHeadphoneId = createSelector(
  [
    (
      state: GlobalState,
      headphoneId: Headphone["id"] | undefined,
    ): Record<Codec["id"], Codec> | undefined =>
      headphoneId
        ? state[codecsSlice.name].codecsByHeadphoneId[headphoneId]?.entities
        : undefined,
  ],
  (entities: Record<Codec["id"], Codec> | undefined): Codec[] | undefined =>
    entities ? Object.values(entities) : undefined,
);

export const {
  selectIds: selectCodecsIds,
  selectAll: selectCodecs,
  selectTotal: selectCodecsTotal,
} = codecsAdapter.getSelectors(
  (globalState: GlobalState): CodecsState => globalState[codecsSlice.name],
);
