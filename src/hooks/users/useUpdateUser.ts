import { Reducer } from "react";
import {
  UpdateUserRequest,
  User,
} from "project-ts";
import { ApiRequest, ApiResponse } from "@types";
import { metaUtil } from "@utils";

interface State
  extends ApiRequest<UpdateUserRequest>,
    ApiResponse<User | undefined> {
  id?: number;
}

export const initialState: State = {
  id: undefined,
  request: {
    first_name: "",
    last_name: "",
    email: "",
  },
  data: undefined,
  ui: metaUtil.initial,
};

export enum Types {
  setId = "SET_ID",
  setFirstName = "SET_FIRST_NAME",
  setLastName = "SET_LAST_NAME",
  setEmail = "SET_EMAIL",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type Actions =
  | { type: Types.setId; payload: number }
  | { type: Types.setFirstName; payload: string }
  | { type: Types.setLastName; payload: string }
  | { type: Types.setEmail; payload: string }
  | { type: Types.loading }
  | { type: Types.loaded; payload: User }
  | { type: Types.rejected };

export const reducer: Reducer<State, Actions> = (state, payload): State => {
  switch (payload.type) {
    case Types.setId:
      return {
        ...state,
        id: payload.payload,
      };
    case Types.setFirstName:
      return {
        ...state,
        request: {
          ...state.request,
          first_name: payload.payload,
        },
      };
    case Types.setLastName:
      return {
        ...state,
        request: {
          ...state.request,
          last_name: payload.payload,
        },
      };
    case Types.setEmail:
      return {
        ...state,
        request: {
          ...state.request,
          email: payload.payload,
        },
      };
    case Types.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case Types.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case Types.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return initialState;
  }
};

