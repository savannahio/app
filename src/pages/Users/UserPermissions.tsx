import React, { useEffect, useReducer } from "react";
import { userPermissionsIS, userPermissionsReducer, UserPermissionTypes } from "@hooks/users/useUserPermissions";
import { usersApi } from "@api/project";

interface Props {
  id: number
}
const UserPermissions: React.FC<Props> = ({ id }) => {
  const [{ data }, dispatch] = useReducer(userPermissionsReducer, userPermissionsIS);
  useEffect(() => {
    dispatch({ type: UserPermissionTypes.setId, payload: id as unknown as number });
    requestHandler()
  }, []);

  const requestHandler = async () => {
    try {
      dispatch({ type: UserPermissionTypes.loading });
      const response = await usersApi.getUserPermissions({ id: id! as unknown as number } )
      dispatch({ type: UserPermissionTypes.loaded, payload: response.data });

    } catch (error) {
      dispatch({ type: UserPermissionTypes.rejected });
    }
  }
  return (
    <div className="flex">
      {data.map(permission => (
        <span key={`user-permission-${permission.id}`}>{permission.name}</span>
      ))}
    </div>
  )
}

export default UserPermissions;
