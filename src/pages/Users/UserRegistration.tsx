import React, { useContext } from "react";
import { AuthContext, AuthContextType } from "@context/authContext";
import { routes } from "@routes";
import { useNavigate } from "react-router";

const UserRegistration: React.FC = () => {
  const { register: { request, ui }, registerUser, setRegisterRequest, loginUser, getAuthUser } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreate();
  };

  const handleCreate = async () => {
    await registerUser(request);
    await loginUser({ email: request.email, password: request.password })
    await getAuthUser()
    navigate(routes.home.path)
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setRegisterRequest({ ...request, email: event.target.value });

  const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setRegisterRequest({ ...request, first_name: event.target.value });

  const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setRegisterRequest({ ...request, last_name: event.target.value });

  const passwordChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setRegisterRequest({ ...request, password: event.target.value });

  const passwordConfirmationChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) =>
    setRegisterRequest({ ...request, password_confirmation: event.target.value });

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
          <input
	disabled={ui.loading}
	type="password"
	value={request.password}
	onChange={passwordChange}
	placeholder="Password"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="password"
	value={request.password_confirmation}
	onChange={passwordConfirmationChange}
	placeholder="Password Confirmation"
          />
        </div>
        <div>
          <button onClick={handleCreate} disabled={ui.loading} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;
