import { ApiRequest, ApiResponse } from "@types";
import { User } from "project-ts";
import { metaUtil } from "@utils";
import { Dispatch, Reducer } from "react";
import { usersApi } from "@api/project";

interface Request {
  id?: number
}
interface State
  extends ApiRequest<Request>, ApiResponse<User | undefined> {}

export const showUserIS: State = {
  request: {
    id: undefined
  },
  data: undefined,
  ui: metaUtil.initial,
};

export enum ShowUserTypes {
  setId = "SET_ID",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type ShowUserActions =
  | { type: ShowUserTypes.setId; payload: number }
  | { type: ShowUserTypes.loading }
  | { type: ShowUserTypes.loaded; payload: User }
  | { type: ShowUserTypes.rejected };

export const showUserReducer: Reducer<State, ShowUserActions> = (state, payload): State => {
  switch (payload.type) {
    case ShowUserTypes.setId:
      return {
        ...state,
        request: {
          id: payload.payload,
        },
      };
    case ShowUserTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case ShowUserTypes.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case ShowUserTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return showUserIS;
  }
};

export const showUser = async (id: number, dispatch: Dispatch<ShowUserActions>) => {
  dispatch({ type: ShowUserTypes.loading });
  try {
    const response = await usersApi.showUser({ id });
    dispatch({ type: ShowUserTypes.loaded, payload: response.data });
  } catch (error) {
    dispatch({ type: ShowUserTypes.rejected });
  }
};
