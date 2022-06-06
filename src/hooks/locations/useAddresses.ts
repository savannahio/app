import { ApiRequest, ApiResponse } from "@types";
import { Address, AddressRequest } from "api-ts-axios";
import { metaUtil } from "@utils";
import { Reducer } from "react";

interface State extends ApiRequest<AddressRequest>, ApiResponse<Address|undefined> {}

export const initialState: State = {
  request: {
    name: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  },
  data: undefined,
  ui: metaUtil.initial,
};

export enum AddressTypes {
  setName = "setName",
  setStreet1 = "setStreet1",
  setStreet2 = "setStreet2",
  setCity = "setCity",
  setState = "setState",
  setZip = "setZip",
  setCountry = "setCountry",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type AddressActions =
  | { type: AddressTypes.setName; payload: string }
  | { type: AddressTypes.setStreet1; payload: string }
  | { type: AddressTypes.setStreet2; payload: string }
  | { type: AddressTypes.setCity; payload: string }
  | { type: AddressTypes.setState; payload: string }
  | { type: AddressTypes.setZip; payload: string }
  | { type: AddressTypes.setCountry; payload: string }
  | { type: AddressTypes.loading }
  | { type: AddressTypes.loaded, payload: Address }
  | { type: AddressTypes.rejected };

export const addressReducer: Reducer<State, AddressActions> = (state, payload): State => {
  switch (payload.type) {
    case AddressTypes.setName:
      return {
        ...state,
        request: {
          ...state.request,
          name: payload.payload,
        },
      };
    case AddressTypes.setStreet1:
      return {
        ...state,
        request: {
          ...state.request,
          street1: payload.payload,
        },
      };
    case AddressTypes.setStreet2:
      return {
        ...state,
        request: {
          ...state.request,
          street2: payload.payload,
        },
      };
    case AddressTypes.setCity:
      return {
        ...state,
        request: {
          ...state.request,
          city: payload.payload,
        },
      };
    case AddressTypes.setState:
      return {
        ...state,
        request: {
          ...state.request,
          state: payload.payload,
        },
      };
    case AddressTypes.setZip:
      return {
        ...state,
        request: {
          ...state.request,
          zip: payload.payload,
        },
      };
    case AddressTypes.setCountry:
      return {
        ...state,
        request: {
          ...state.request,
          country: payload.payload,
        },
      };
    case AddressTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case AddressTypes.loaded:
      return {
        ...state,
        data: payload.payload,
        ui: metaUtil.loaded,
      };
    case AddressTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return initialState;
  }
};
