import React, { useContext, useEffect, useReducer } from "react";
import { AuthContext, AuthContextType } from "@context/authContext";
import { defaultLocationIS, defaultLocationReducer, DefaultLocationTypes } from "@hooks/locations/useDefaultLocation";
import UpdateUser from "@pages/Users/UpdateUser";
import AddressForm from "@components/AddressForm";
import { usersApi } from "@api/project";

const UpdateAuthUser: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const [state, dispatch] = useReducer(defaultLocationReducer, defaultLocationIS);
  useEffect(() => {
    usersApi.getUserDefaultAddress({id: user!.id})
      .then(({ data }) => {
        if (typeof data === 'object') {
          dispatch({ type: DefaultLocationTypes.loaded, payload: data })
        }
    })
  }, []);

  return (
    <div>
      <UpdateUser user={user!} />
      <br />
      <br />
      <AddressForm address={state.data} />
    </div>
  )
};

export default UpdateAuthUser;
