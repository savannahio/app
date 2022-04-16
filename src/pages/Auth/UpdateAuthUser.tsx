import React, { useContext } from "react";
import { AuthContext, AuthContextType } from "@context/authContext";
import UpdateUser from "@pages/Users/UpdateUser";

const UpdateAuthUser: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  return <UpdateUser user={user!} />
};

export default UpdateAuthUser;
