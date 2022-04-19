import { Dispatch, Reducer } from "react";
import {
  UsersApiGetUsersRequest,
  PaginatedUsers,
  UserOrderBy,
  DirectionParam,
} from "api-ts-axios";
import { usersApi } from "@api/project";
import { ApiRequest, ApiResponse, PaginationActions, PaginationTypes } from "@types";
import { metaUtil } from "@utils";

interface State
  extends ApiRequest<UsersApiGetUsersRequest>,
    ApiResponse<PaginatedUsers> {}

export const initialState: State = {
  request: {
    page: 1,
    per_page: 20,
    direction: DirectionParam.asc,
    order_by: UserOrderBy.id,
  },
  data: {
    data: [],
  },
  ui: metaUtil.initial,
};

export type Actions = PaginationActions<UserOrderBy, PaginatedUsers>;

export const reducer: Reducer<State, Actions> = (state, payload): State => {
  switch (payload.type) {
    case PaginationTypes.setPage:
      return {
        ...state,
        request: {
          ...state.request,
          page: payload.payload,
        },
      };
    case PaginationTypes.setPerPage:
      return {
        ...state,
        request: {
          ...state.request,
          per_page: payload.payload,
        },
      };
    case PaginationTypes.setDirection:
      return {
        ...state,
        request: {
          ...state.request,
          direction: payload.payload,
        },
      };
    case PaginationTypes.setOrderBy:
      return {
        ...state,
        request: {
          ...state.request,
          order_by: payload.payload,
        },
      };
    case PaginationTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case PaginationTypes.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case PaginationTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return initialState;
  }
};

export const getUsers = async (
  request: UsersApiGetUsersRequest,
  dispatch: Dispatch<Actions>
) => {
  dispatch({ type: PaginationTypes.loading });
  try {
    const { data } = await usersApi.getUsers(request);
    dispatch({ type: PaginationTypes.loaded, payload: data });
  } catch (error) {
    dispatch({ type: PaginationTypes.rejected });
  }
};
