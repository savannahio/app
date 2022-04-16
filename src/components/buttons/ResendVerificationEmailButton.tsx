import React, { useReducer } from "react";
import {
  initialVerifyEmailState,
  verifyEmailReducer,
  VerificationEmailTypes
} from "@hooks/auth/useResendVerificationEmail";
import { authApi } from "@api/project";

const ResendVerificationEmailButton: React.FC<{}> = () => {
  const [{ ui }, dispatch] = useReducer(verifyEmailReducer, initialVerifyEmailState);

  const handleSubmit = async () => {
    try {
      dispatch({ type: VerificationEmailTypes.loading });
      await authApi.resendVerificationEmail();
      dispatch({ type: VerificationEmailTypes.loaded });
    } catch(error) {
      dispatch({ type: VerificationEmailTypes.rejected });
    }
  };

  return (
    <button type="button" disabled={ui.loading} onClick={handleSubmit}>
      Resend Verification Email
    </button>
  );
};

export default ResendVerificationEmailButton;
