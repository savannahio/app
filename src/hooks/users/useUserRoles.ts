import { ApiRequest, ApiResponse } from "@types";
import {
  DirectionParam,
  PaginatedRoles,
  RoleOrderBy,
  UsersApiGetUserRolesRequest,
} from "project-ts";
import { metaUtil } from "@utils";
import { Reducer } from "react";

interface State
  extends ApiRequest<UsersApiGetUserRolesRequest>,
    ApiResponse<PaginatedRoles> {}

export const userRoleIS: State = {
  request: {
    id: 0,
    page: 1,
    per_page: 100000,
    direction: DirectionParam.asc,
    order_by: RoleOrderBy.id,
  },
  data: {
    data: [],
  },
  ui: metaUtil.initial,
};

export enum UserRoleTypes {
  setId = 'SET_ID',
  setPage = "SET_PAGE",
  setPerPage = "SET_PER_PAGE",
  setDirection = "SET_DIRECTION",
  setOrderBy = "SET_ORDER_BY",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type UserRoleActions =
  { type: UserRoleTypes.setId; payload: number }
  | { type: UserRoleTypes.setPage; payload: number }
  | { type: UserRoleTypes.setPerPage; payload: number }
  | { type: UserRoleTypes.setDirection; payload: DirectionParam }
  | { type: UserRoleTypes.setOrderBy; payload: RoleOrderBy }
  | { type: UserRoleTypes.loading }
  | { type: UserRoleTypes.loaded; payload: PaginatedRoles }
  | { type: UserRoleTypes.rejected };

export const userRolesReducer: Reducer<State, UserRoleActions> = (state, payload): State => {
  switch (payload.type) {
    case UserRoleTypes.setId:
      return {
        ...state,
        request: {
          ...state.request,
          id: payload.payload,
        },
      };
    case UserRoleTypes.setPage:
      return {
        ...state,
        request: {
          ...state.request,
          page: payload.payload,
        },
      };
    case UserRoleTypes.setPerPage:
      return {
        ...state,
        request: {
          ...state.request,
          per_page: payload.payload,
        },
      };
    case UserRoleTypes.setDirection:
      return {
        ...state,
        request: {
          ...state.request,
          direction: payload.payload,
        },
      };
    case UserRoleTypes.setOrderBy:
      return {
        ...state,
        request: {
          ...state.request,
          order_by: payload.payload,
        },
      };
    case UserRoleTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case UserRoleTypes.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case UserRoleTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return userRoleIS;
  }
};
