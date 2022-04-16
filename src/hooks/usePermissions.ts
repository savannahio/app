import { ApiRequest, ApiResponse, PaginationActions, PaginationTypes } from "@types";
import {
  DirectionParam,
  PaginatedPermissions,
  PermissionOrderBy,
  PermissionsApiGetPermissionsRequest,
} from "project-ts";
import { metaUtil } from "@utils";
import { Dispatch, Reducer } from "react";
import { permissionsApi } from "@api/project";

interface State
  extends ApiRequest<PermissionsApiGetPermissionsRequest>,
    ApiResponse<PaginatedPermissions> {}

export const initialState: State = {
  request: {
    page: 1,
    per_page: 20,
    direction: DirectionParam.asc,
    order_by: PermissionOrderBy.id,
  },
  data: {
    data: [],
  },
  ui: metaUtil.initial,
};

export type Actions = PaginationActions<
  PermissionOrderBy,
  PaginatedPermissions
>;

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

export const getPermissions = async (
  request: PermissionsApiGetPermissionsRequest,
  dispatch: Dispatch<Actions>
) => {
  dispatch({ type: PaginationTypes.loading });
  try {
    const { data } = await permissionsApi.getPermissions(request);
    dispatch({ type: PaginationTypes.loaded, payload: data });
  } catch (error) {
    dispatch({ type: PaginationTypes.rejected });
  }
};
