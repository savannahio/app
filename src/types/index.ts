import { DirectionParam, ValidationError } from "project-ts";

export interface UI {
  loading: boolean;
  loaded: boolean;
}

export interface Observer {
  ui: UI;
}

export interface ApiRequest<Request> extends Observer {
  request: Request;
}

export interface ApiResponse<Response> extends Observer {
  data: Response;
}

export interface ApiCall<Request, Response> extends Observer, ApiRequest<Request>, ApiResponse<Response> {}

export interface Model<T> {
  data: T;
  ui: UI;
  errors?: ValidationError;
}

export enum PaginationTypes {
  setPage = "SET_PAGE",
  setPerPage = "SET_PER_PAGE",
  setDirection = "SET_DIRECTION",
  setOrderBy = "SET_ORDER_BY",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type PaginationActions<Order_By, Response> =
  | { type: PaginationTypes.setPage; payload: number }
  | { type: PaginationTypes.setPerPage; payload: number }
  | { type: PaginationTypes.setDirection; payload: DirectionParam }
  | { type: PaginationTypes.setOrderBy; payload: Order_By }
  | { type: PaginationTypes.loading }
  | { type: PaginationTypes.loaded; payload: Response }
  | { type: PaginationTypes.rejected };
