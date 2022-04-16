import React, { useContext } from "react";
import { AuthContext, AuthContextType } from "@context/authContext";
import { routes } from "@routes";
import { useNavigate } from "react-router";

const LogoutButton: React.FC<{}> = () => {
  const { logout: { ui }, logoutUser } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await logoutUser()
    navigate(routes.auth.login.path)
  };

  return (
    <button type="button" disabled={ui.loading} onClick={handleSubmit}>
      Logout
    </button>
  );
};

export default LogoutButton;
