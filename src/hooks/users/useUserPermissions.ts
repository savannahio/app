import { ApiRequest, ApiResponse } from "@types";
import {
  DirectionParam,
  PaginatedPermissions,
  PermissionOrderBy,
  UsersApiGetUserPermissionsRequest,
} from "project-ts";
import { metaUtil } from "@utils";
import { Reducer } from "react";

interface State
  extends ApiRequest<UsersApiGetUserPermissionsRequest>,
    ApiResponse<PaginatedPermissions> {}

export const userPermissionsIS: State = {
  request: {
    id: 0,
    page: 1,
    per_page: 100000,
    direction: DirectionParam.asc,
    order_by: PermissionOrderBy.id,
  },
  data: {
    data: [],
  },
  ui: metaUtil.initial,
};

export enum UserPermissionTypes {
  setId = 'SET_ID',
  setPage = "SET_PAGE",
  setPerPage = "SET_PER_PAGE",
  setDirection = "SET_DIRECTION",
  setOrderBy = "SET_ORDER_BY",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type UserPermissionActions =
  { type: UserPermissionTypes.setId; payload: number }
  | { type: UserPermissionTypes.setPage; payload: number }
  | { type: UserPermissionTypes.setPerPage; payload: number }
  | { type: UserPermissionTypes.setDirection; payload: DirectionParam }
  | { type: UserPermissionTypes.setOrderBy; payload: PermissionOrderBy }
  | { type: UserPermissionTypes.loading }
  | { type: UserPermissionTypes.loaded; payload: PaginatedPermissions }
  | { type: UserPermissionTypes.rejected };

export const userPermissionsReducer: Reducer<State, UserPermissionActions> = (state, payload): State => {
  switch (payload.type) {
    case UserPermissionTypes.setId:
      return {
        ...state,
        request: {
          ...state.request,
          id: payload.payload,
        },
      };
    case UserPermissionTypes.setPage:
      return {
        ...state,
        request: {
          ...state.request,
          page: payload.payload,
        },
      };
    case UserPermissionTypes.setPerPage:
      return {
        ...state,
        request: {
          ...state.request,
          per_page: payload.payload,
        },
      };
    case UserPermissionTypes.setDirection:
      return {
        ...state,
        request: {
          ...state.request,
          direction: payload.payload,
        },
      };
    case UserPermissionTypes.setOrderBy:
      return {
        ...state,
        request: {
          ...state.request,
          order_by: payload.payload,
        },
      };
    case UserPermissionTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case UserPermissionTypes.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case UserPermissionTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return userPermissionsIS;
  }
};
