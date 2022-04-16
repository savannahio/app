import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { showUserIS, showUserReducer, ShowUserTypes } from "@hooks/users/useShowUser";
import { usersApi } from "@api/project";
import UserPermissions from "@pages/Users/UserPermissions";
import UserRoles from "@pages/Users/UserRoles";

const UserAddEdit: React.FC = () => {
  const [{ data }, dispatch] = useReducer(showUserReducer, showUserIS);
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      dispatch({ type: ShowUserTypes.setId, payload: id as unknown as number });
      requestHandler()
    }
  }, []);

  const requestHandler = async () => {
    try {
      dispatch({ type: ShowUserTypes.loading });
      const response = await usersApi.showUser({ id: id! as unknown as number } )
      dispatch({ type: ShowUserTypes.loaded, payload: response.data });

    } catch (error) {
      dispatch({ type: ShowUserTypes.rejected });
    }
  }
  return (
    <div className="flex">
      <div className="flex">
        <span>{data?.id}</span>
        <span>{data?.first_name}</span>
        <span>{data?.last_name}</span>
        <span>{data?.email}</span>
      </div>
      <div className="flex">
        {id && <UserPermissions id={id as unknown as number}/>}
        {id && <UserRoles id={id as unknown as number}/>}
      </div>
    </div>
  )
}

export default UserAddEdit;
