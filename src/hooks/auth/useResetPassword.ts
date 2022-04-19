import { ApiRequest } from "@types";
import { ResetPasswordRequest, AuthApiResetPasswordRequest } from "api-ts-axios";
import { metaUtil } from "@utils";
import { Dispatch, Reducer } from "react";
import { authApi } from "@api/project";

interface State extends ApiRequest<ResetPasswordRequest> {}

export const initialState: State = {
  request: {
    new_password: "",
    new_password_confirmation: "",
  },
  ui: metaUtil.initial,
};

export enum ResetPasswordTypes {
  setNewPassword = "SET_NEW_PASSWORD",
  setNewPasswordConfirmation = "SET_NEW_PASSWORD_CONFIRMATION",
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type Actions =
  | { type: ResetPasswordTypes.setNewPassword; payload: string }
  | { type: ResetPasswordTypes.setNewPasswordConfirmation; payload: string }
  | { type: ResetPasswordTypes.loading }
  | { type: ResetPasswordTypes.loaded }
  | { type: ResetPasswordTypes.rejected };

export const reducer: Reducer<State, Actions> = (state, payload): State => {
  switch (payload.type) {
    case ResetPasswordTypes.setNewPassword:
      return {
        ...state,
        request: {
          ...state.request,
          new_password: payload.payload,
        },
      };
    case ResetPasswordTypes.setNewPasswordConfirmation:
      return {
        ...state,
        request: {
          ...state.request,
          new_password_confirmation: payload.payload,
        },
      };
    case ResetPasswordTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case ResetPasswordTypes.loaded:
      return {
        ...state,
        ui: metaUtil.loaded,
      };
    case ResetPasswordTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return initialState;
  }
};

export const resetPassword = async (
  request: ResetPasswordRequest,
  dispatch: Dispatch<Actions>
) => {
  dispatch({ type: ResetPasswordTypes.loading });
  try {
    const req: AuthApiResetPasswordRequest = {
      ResetPasswordRequest: request,
    };
    await authApi.resetPassword(req);
    dispatch({ type: ResetPasswordTypes.loaded });
  } catch (error) {
    dispatch({ type: ResetPasswordTypes.rejected });
  }
};
