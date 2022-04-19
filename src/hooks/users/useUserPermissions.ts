import { ApiRequest, ApiResponse } from "@types";
import {
  Permission,
  UsersApiGetUserPermissionsRequest
} from "api-ts-axios";
import { metaUtil } from "@utils";
import { Reducer } from "react";

interface State
  extends ApiRequest<UsersApiGetUserPermissionsRequest>,
    ApiResponse<Array<Permission>> {}

export const userPermissionsIS: State = {
  request: {
    id: 0,
  },
  data: [],
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
  | { type: UserPermissionTypes.loading }
  | { type: UserPermissionTypes.loaded; payload: Array<Permission> }
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
