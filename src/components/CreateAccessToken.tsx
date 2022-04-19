import React, { useReducer } from "react";
import {
  initialState,
  reducer,
  CreateTokenTypes,
} from "@hooks/tokens/useCreateToken";
import { NewAccessToken } from "api-ts-axios";
import { accessTokenApi } from "@api/project";

interface Props {
  onCreate: (val: NewAccessToken) => void
}

const CreateAccessToken: React.FC<Props> = ({ onCreate }) => {
  const [{ request, ui }, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requestHandler();
  };

  const requestHandler = async () => {
    try {
      dispatch({ type: CreateTokenTypes.loading });
      const response = await accessTokenApi.createToken({ CreateAccessTokenRequest: request});
      dispatch({ type: CreateTokenTypes.loaded, payload: response.data });
      onCreate(response.data)
      dispatch({ type: CreateTokenTypes.setName, payload: "" });
    } catch (error) {
      dispatch({ type: CreateTokenTypes.rejected });
    }

  };

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => dispatch({ type: CreateTokenTypes.setName, payload: event.target.value });

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
          <button onClick={requestHandler} disabled={ui.loading} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccessToken;
