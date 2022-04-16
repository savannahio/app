import React, { useContext } from "react";
import { AuthContext, AuthContextType } from "@context/authContext";
import { useNavigate } from "react-router";
import { routes } from "@routes";

const Login: React.FC<{}> = () => {
  const { login: { request, ui }, setLoginRequest, loginUser,  getAuthUser } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    await loginUser(request);
    await getAuthUser()
    navigate(routes.home.path)
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setLoginRequest({...request, email: event.target.value})

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setLoginRequest({...request, password: event.target.value})

  return (
    <div className="flex">
      <form onSubmit={handleSubmit}>
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
	onChange={handlePasswordChange}
	placeholder="Password"
          />
        </div>
        <div>
          <button onClick={handleLogin} disabled={ui.loading} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
