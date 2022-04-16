import { Observer } from "@types";
import { metaUtil } from "@utils";
import { Dispatch, Reducer } from "react";
import { authApi } from "@api/project";

interface State extends Observer {}

export const initialVerifyEmailState: State = {
  ui: metaUtil.initial,
};

export enum VerificationEmailTypes {
  loading = "LOADING",
  loaded = "LOADED",
  rejected = "REJECTED",
}

export type Actions =
  | { type: VerificationEmailTypes.loading }
  | { type: VerificationEmailTypes.loaded }
  | { type: VerificationEmailTypes.rejected };

export const verifyEmailReducer: Reducer<State, Actions> = (state, payload): State => {
  switch (payload.type) {
    case VerificationEmailTypes.loading:
      return {
        ...state,
        ui: metaUtil.loading,
      };
    case VerificationEmailTypes.loaded:
      return {
        ...state,
        ui: metaUtil.loaded,
      };
    case VerificationEmailTypes.rejected:
      return {
        ...state,
        ui: metaUtil.rejected,
      };
    default:
      return initialVerifyEmailState;
  }
};

export const resendVerificationEmail = async (dispatch: Dispatch<Actions>) => {
  dispatch({ type: VerificationEmailTypes.loading });
  try {
    await authApi.resendVerificationEmail();
    dispatch({ type: VerificationEmailTypes.loaded });
  } catch (error) {
    dispatch({ type: VerificationEmailTypes.rejected });
  }
};
