import React, { useReducer, useEffect, useContext } from "react";
import {
  initialState,
  reducer,
  Types,
} from "@hooks/users/useUpdateUser";
import { AuthUser, User } from "project-ts";
import ResendVerificationEmailButton from "@components/buttons/ResendVerificationEmailButton";
import { AuthContext, AuthContextType } from "@context/authContext";
import { usersApi } from "@api/project";

interface Props {
  user: User | AuthUser;
}

const UpdateUser: React.FC<Props> = ({ user }) => {
  const { user: authUser, setAuthUser } = useContext(AuthContext) as AuthContextType;
  const [{ id, request, ui }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    if (id === undefined) {
      dispatch({ type: Types.setId, payload: user.id });
    }
    if (request.first_name === "") {
      dispatch({ type: Types.setFirstName, payload: user.first_name });
    }
    if (request.last_name === "") {
      dispatch({ type: Types.setLastName, payload: user.last_name });
    }
    if (request.email === "") {
      dispatch({ type: Types.setEmail, payload: user.email });
    }
  }, [id, request.first_name, request.last_name, request.email]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    try {
      dispatch({ type: Types.loading });
      const response = await usersApi.updateUser({ id: id!, UpdateUserRequest: request});
      dispatch({ type: Types.loaded, payload: response.data });
      if (authUser?.id === response.data.id) {
        setAuthUser(response.data);
      }
    } catch (error) {
      dispatch({ type: Types.rejected });
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => dispatch({ type: Types.setEmail, payload: event.target.value });

  const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => dispatch({ type: Types.setFirstName, payload: event.target.value });

  const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => dispatch({ type: Types.setLastName, payload: event.target.value });

  return (
    <div className="flex">
      <form onSubmit={handleSubmit}>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.first_name}
	onChange={handleFirstNameChange}
	placeholder="First Name"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.last_name}
	onChange={handleLastNameChange}
	placeholder="Last Name"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.email}
	onChange={handleEmailChange}
	placeholder="Email"
          />
        </div>
        <div>
          <button onClick={handleLogin} disabled={ui.loading} type="submit">
            Save
          </button>
        </div>
      </form>
      <div className="flex">
        {user && "meta" in user && !user.meta.is_email_verified && (
          <ResendVerificationEmailButton />
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
