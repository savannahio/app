import { ApiRequest, ApiResponse } from "@types";
import {
  CreateAccessTokenRequest,
  NewAccessToken,
} from "project-ts";
import { metaUtil } from "@utils";
import {  Reducer } from "react";

interface State extends ApiRequest<CreateAccessTokenRequest>, ApiResponse<NewAccessToken | undefined> {}

export const initialState: State = {
  request: {
    name: "",
  },
  data: undefined,
  ui: metaUtil.initial,
};

export enum CreateTokenTypes {
  setName = "SET_NAME",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type Actions =
  | { type: CreateTokenTypes.setName; payload: string }
  | { type: CreateTokenTypes.loading }
  | { type: CreateTokenTypes.loaded; payload: NewAccessToken }
  | { type: CreateTokenTypes.rejected };

export const reducer: Reducer<State, Actions> = (state, payload): State => {
  switch (payload.type) {
    case CreateTokenTypes.setName:
      return {
        ...state,
        request: {
          ...state.request,
          name: payload.payload,
        },
      };
    case CreateTokenTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case CreateTokenTypes.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case CreateTokenTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return initialState;
  }
};

