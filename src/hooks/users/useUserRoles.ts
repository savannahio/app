import { ApiRequest, ApiResponse } from "@types";
import {
  Role,
  UsersApiGetUserRolesRequest
} from "api-ts-axios";
import { metaUtil } from "@utils";
import { Reducer } from "react";

interface State
  extends ApiRequest<UsersApiGetUserRolesRequest>,
    ApiResponse<Array<Role>> {}

export const userRoleIS: State = {
  request: {
    id: 0,
  },
  data: [],
  ui: metaUtil.initial,
};

export enum UserRoleTypes {
  setId = 'SET_ID',
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type UserRoleActions =
  { type: UserRoleTypes.setId; payload: number }
  | { type: UserRoleTypes.loading }
  | { type: UserRoleTypes.loaded; payload: Array<Role> }
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
