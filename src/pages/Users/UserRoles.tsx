import React, { useEffect, useReducer } from "react";
import { userRoleIS, userRolesReducer, UserRoleTypes } from "@hooks/users/useUserRoles";
import { usersApi } from "@api/project";

interface Props {
  id: number
}
const UserRoles: React.FC<Props> = ({ id }) => {
  const [{ data }, dispatch] = useReducer(userRolesReducer, userRoleIS);
  useEffect(() => {
    dispatch({ type: UserRoleTypes.setId, payload: id as unknown as number });
    requestHandler()
  }, []);

  const requestHandler = async () => {
    try {
      dispatch({ type: UserRoleTypes.loading });
      const response = await usersApi.getUserRoles({ id: id! as unknown as number } )
      dispatch({ type: UserRoleTypes.loaded, payload: response.data });

    } catch (error) {
      dispatch({ type: UserRoleTypes.rejected });
    }
  }
  return (
    <div className="flex">
      {data.data.map(role => (
        <span key={`user-role-${role.id}`}>{role.name}</span>
      ))}
    </div>
  )
}

export default UserRoles;
