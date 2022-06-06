import React, { useContext, useEffect, useReducer } from "react";
import { AuthContext, AuthContextType } from "@context/authContext";
import { initialState, addressReducer, AddressTypes } from "@hooks/locations/useAddresses";
import { usersApi } from "@api/project";
import { AddressRequest } from "api-ts-axios";

type InputType = React.ChangeEventHandler<HTMLInputElement>
interface Props {
  address?: AddressRequest
}
const AddressForm: React.FC<Props> = ({ address }) => {
  const { user } = useContext(AuthContext) as AuthContextType
  const [{ request, ui }, dispatch] = useReducer(addressReducer, initialState);
  useEffect(() => {
    dispatch({ type: AddressTypes.setName, payload: address? address.name : `${user?.first_name} ${user?.last_name}` })
    dispatch({ type: AddressTypes.setCountry, payload: address? address.country : 'US' })
    if (address) {
      dispatch({ type: AddressTypes.setStreet1, payload: address.street1 })
      if (address.street2) {
        dispatch({ type: AddressTypes.setStreet2, payload: address.street2 })
      }
      dispatch({ type: AddressTypes.setCity, payload: address.city })
      dispatch({ type: AddressTypes.setState, payload: address.state })
      dispatch({ type: AddressTypes.setZip, payload: address.zip })
      dispatch({ type: AddressTypes.setCountry, payload: address.country })
    }
    }, [address]);


  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    dispatch({type: AddressTypes.loading})
    try {
      const {data} = await usersApi.updateUserDefaultAddress({ id: user!.id, AddressRequest: request })
      dispatch({type: AddressTypes.loaded, payload: data })
    } catch (error) {
      dispatch({type: AddressTypes.rejected})
    }
  };

  const handleNameChange: InputType = (event) => dispatch({ type: AddressTypes.setName, payload: event.target.value })

  const street1Change: InputType = (event) => dispatch({ type: AddressTypes.setStreet1, payload: event.target.value })

  const street2Change: InputType = (event) => dispatch({ type: AddressTypes.setStreet2, payload: event.target.value })

  const cityChange: InputType = (event) => dispatch({ type: AddressTypes.setCity, payload: event.target.value })

  const stateChange: InputType = (event) => dispatch({ type: AddressTypes.setState, payload: event.target.value })

  const countryChange: InputType = (event) => dispatch({ type: AddressTypes.setCountry, payload: event.target.value.toUpperCase() })

  const zipChange: InputType = (event) => dispatch({ type: AddressTypes.setZip, payload: event.target.value.toUpperCase() })

  return (
    <div className="flex">
      <form onSubmit={handleSubmit}>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.name}
	onChange={handleNameChange}
	placeholder="Name"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.street1}
	onChange={street1Change}
	placeholder="Street1"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.street2 as string}
	onChange={street2Change}
	placeholder="Street2"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.city}
	onChange={cityChange}
	placeholder="City"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.state}
	onChange={stateChange}
	placeholder="State"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.zip}
	onChange={zipChange}
	placeholder="Zip"
          />
        </div>
        <div>
          <input
	disabled={ui.loading}
	type="text"
	value={request.country}
	onChange={countryChange}
	placeholder="Country"
          />
        </div>
        <div>
          <button onClick={handleLogin} disabled={ui.loading} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
