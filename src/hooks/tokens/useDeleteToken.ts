import { ApiRequest } from "@types";
import { AccessTokensApiDeleteTokenRequest } from "api-ts-axios";
import { metaUtil } from "@utils";
import { Reducer } from "react";

interface State extends ApiRequest<AccessTokensApiDeleteTokenRequest> {}

export const deleteTokenIS: State = {
  request: {
    id: 0,
  },
  ui: metaUtil.initial,
};

export enum DeleteTokenTypes {
  setId = "SET_ID",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type DeleteTokenActions =
  | { type: DeleteTokenTypes.setId; payload: number }
  | { type: DeleteTokenTypes.loading }
  | { type: DeleteTokenTypes.loaded }
  | { type: DeleteTokenTypes.rejected };

export const deleteTokenReducer: Reducer<State, DeleteTokenActions> = (state, payload): State => {
  switch (payload.type) {
    case DeleteTokenTypes.setId:
      return {
        ...state,
        request: {
          ...state.request,
          id: payload.payload,
        },
      };
    case DeleteTokenTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case DeleteTokenTypes.loaded:
      return {
        ...state,
        ui: metaUtil.loaded,
      };
    case DeleteTokenTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return deleteTokenIS;
  }
};
