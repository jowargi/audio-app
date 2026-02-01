import { createSlice, type AnyAction } from "@reduxjs/toolkit";
import {
  REQUEST_STATUS_FULFILLED,
  REQUEST_STATUS_IDLE,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
  type RequestStatus,
} from "../../constants/requestStatuses";

type RequestsState = Record<string, RequestStatus>;

interface RequestAction extends AnyAction {
  meta: { requestId: string; [extraMeta: string]: unknown };
}

const initialState: RequestsState = {};

const isRequestAction = (action: AnyAction): action is RequestAction =>
  typeof action.meta?.requestId === "string";

export const requestsSlice = createSlice({
  name: "requests",
  initialState,

  reducers: {
    deleteRequestById: (
      state: RequestsState,
      { payload }: { payload: string },
    ): void => {
      if (state[payload]) delete state[payload];
    },
  },

  extraReducers(builder) {
    builder
      .addMatcher(
        (action: AnyAction): boolean =>
          action.type.endsWith("/pending") && isRequestAction(action),
        (state: RequestsState, action: RequestAction): void => {
          state[action.meta.requestId] = REQUEST_STATUS_PENDING;
        },
      )
      .addMatcher(
        (action: AnyAction): boolean =>
          action.type.endsWith("/fulfilled") && isRequestAction(action),
        (state: RequestsState, action: RequestAction): void => {
          state[action.meta.requestId] = REQUEST_STATUS_FULFILLED;
        },
      )
      .addMatcher(
        (action: AnyAction): boolean =>
          action.type.endsWith("/rejected") && isRequestAction(action),
        (state: RequestsState, action: RequestAction): void => {
          state[action.meta.requestId] = REQUEST_STATUS_REJECTED;
        },
      );
  },

  selectors: {
    selectStatus: (
      state: RequestsState,
      id: string | undefined,
    ): RequestStatus =>
      id ? state[id] || REQUEST_STATUS_IDLE : REQUEST_STATUS_IDLE,

    selectIsLoading: (state: RequestsState, id: string | undefined): boolean =>
      !!id && state[id] === REQUEST_STATUS_PENDING,

    selectIsFinished: (state: RequestsState, id: string | undefined): boolean =>
      !!id &&
      (state[id] === REQUEST_STATUS_FULFILLED ||
        state[id] === REQUEST_STATUS_REJECTED),
  },
});

export const { deleteRequestById } = requestsSlice.actions;
export const { selectStatus, selectIsLoading, selectIsFinished } =
  requestsSlice.selectors;
