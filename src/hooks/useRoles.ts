import { ApiRequest, ApiResponse, PaginationActions, PaginationTypes } from "@types";
import {
  DirectionParam,
  PaginatedRoles,
  RoleOrderBy,
  RolesApiGetRolesRequest,
} from "api-ts-axios";
import { metaUtil } from "@utils";
import { Dispatch, Reducer } from "react";
import { rolesApi } from "@api/project";

interface State
  extends ApiRequest<RolesApiGetRolesRequest>,
    ApiResponse<PaginatedRoles> {}

export const initialState: State = {
  request: {
    page: 1,
    per_page: 20,
    direction: DirectionParam.asc,
    order_by: RoleOrderBy.id,
  },
  data: {
    data: [],
  },
  ui: metaUtil.initial,
};

export type Actions = PaginationActions<RoleOrderBy, PaginatedRoles>;

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

export const getRoles = async (
  request: RolesApiGetRolesRequest,
  dispatch: Dispatch<Actions>
) => {
  dispatch({ type: PaginationTypes.loading });
  try {
    const { data } = await rolesApi.getRoles(request);
    dispatch({ type: PaginationTypes.loaded, payload: data });
  } catch (error) {
    dispatch({ type: PaginationTypes.rejected });
  }
};
