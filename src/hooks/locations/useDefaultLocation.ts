import { ApiResponse } from "@types";
import {
  Address
} from "api-ts-axios";
import { metaUtil } from "@utils";
import {  Reducer } from "react";

interface State extends ApiResponse<Address | undefined> {}

export const defaultLocationIS: State = {
  data: undefined,
  ui: metaUtil.initial,
};

export enum DefaultLocationTypes {
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type DefaultLocationActions =
  | { type: DefaultLocationTypes.loading }
  | { type: DefaultLocationTypes.loaded; payload: Address }
  | { type: DefaultLocationTypes.rejected };

export const defaultLocationReducer: Reducer<State, DefaultLocationActions> = (state, payload): State => {
  switch (payload.type) {
    case DefaultLocationTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case DefaultLocationTypes.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case DefaultLocationTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return defaultLocationIS;
  }
};

