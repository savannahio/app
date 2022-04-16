import { Reducer } from "react";
import {
  AccessTokensApiGetTokensRequest,
  PaginatedAccessTokens,
  AccessTokenOrderBy,
  DirectionParam, PersonalAccessToken
} from "project-ts";
import { ApiRequest, ApiResponse } from "@types";
import { metaUtil } from "@utils";

interface State
  extends ApiRequest<AccessTokensApiGetTokensRequest>,
    ApiResponse<PaginatedAccessTokens> {}

export const tokenIS: State = {
  request: {
    page: 1,
    per_page: 20,
    direction: DirectionParam.asc,
    order_by: AccessTokenOrderBy.id,
  },
  data: {
    data: [],
  },
  ui: metaUtil.initial,
};

export enum TokenTypes {
  removeItem = "REMOVE_ITEM",
  addItem = "ADD_ITEM",
  setPage = "SET_PAGE",
  setPerPage = "SET_PER_PAGE",
  setDirection = "SET_DIRECTION",
  setOrderBy = "SET_ORDER_BY",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type TokenActions =
  | { type: TokenTypes.removeItem; payload: PersonalAccessToken }
  | { type: TokenTypes.addItem; payload: PersonalAccessToken }
  | { type: TokenTypes.setPage; payload: number }
  | { type: TokenTypes.setPerPage; payload: number }
  | { type: TokenTypes.setDirection; payload: DirectionParam }
  | { type: TokenTypes.setOrderBy; payload: AccessTokenOrderBy }
  | { type: TokenTypes.loading }
  | { type: TokenTypes.loaded; payload: PaginatedAccessTokens }
  | { type: TokenTypes.rejected }


export const tokenReducer: Reducer<State, TokenActions> = (state, payload): State => {
  switch (payload.type) {
    case TokenTypes.removeItem:
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter(item => item.id !== payload.payload.id)
        }
      };
    case TokenTypes.addItem:
      return {
        ...state,
        data: {
          ...state.data,
          data: [...state.data.data, payload.payload]
        }
      };
    case TokenTypes.setPage:
      return {
        ...state,
        request: {
          ...state.request,
          page: payload.payload,
        },
      };
    case TokenTypes.setPerPage:
      return {
        ...state,
        request: {
          ...state.request,
          per_page: payload.payload,
        },
      };
    case TokenTypes.setDirection:
      return {
        ...state,
        request: {
          ...state.request,
          direction: payload.payload,
        },
      };
    case TokenTypes.setOrderBy:
      return {
        ...state,
        request: {
          ...state.request,
          order_by: payload.payload,
        },
      };
    case TokenTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case TokenTypes.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case TokenTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return tokenIS;
  }
};
