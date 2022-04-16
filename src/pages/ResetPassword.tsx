import React, { useReducer } from "react";
import {
  initialState,
  reducer,
  resetPassword,
  ResetPasswordTypes,
} from "@hooks/auth/useResetPassword";

const ResetPassword: React.FC<{}> = () => {
  const [{ request, ui }, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit();
  };

  const onSubmit = async () =>  resetPassword(request, dispatch);

  const newPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => dispatch({ type: ResetPasswordTypes.setNewPassword, payload: event.target.value });

  const passwordConfirmationChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) =>
    dispatch({
      type: ResetPasswordTypes.setNewPasswordConfirmation,
      payload: event.target.value,
    });

  return (
    <div className="flex">
      <form onSubmit={handleSubmit}>
        <div>
          <input
	disabled={ui.loading}
	type="password"
	value={request.new_password}
	onChange={newPasswordChange}
	placeholder="Password"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="password"
	value={request.new_password_confirmation}
	onChange={passwordConfirmationChange}
	placeholder="Password Confirmation"
          />
        </div>
        <div>
          <button onClick={onSubmit} disabled={ui.loading} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
