import React, { useEffect, useReducer } from "react";
import CreateAccessToken from "@components/CreateAccessToken";
import {
  tokenIS,
  tokenReducer,
  TokenTypes
} from "@hooks/tokens/useTokens";
import { DirectionParam, NewAccessToken, PersonalAccessToken } from "api-ts-axios";
import DirectionSelector from "@components/selectors/DirectionSelector";
import PerPageSelector from "@components/selectors/PerPageSelector";
import DeleteTokenButton from "@components/buttons/DeleteTokenButton";
import { accessTokenApi } from "@api/project";

;

const AccessTokens: React.FC = () => {
  const [{ request, data, ui }, dispatch] = useReducer(tokenReducer, tokenIS);
  useEffect(() => {
    requestHandler();
  }, []);

  const requestHandler = async () => {
    try {
      dispatch({ type: TokenTypes.loading });
      const response = await accessTokenApi.getTokens(request)
      dispatch({ type: TokenTypes.loaded, payload: response.data });
    } catch (error) {
      dispatch({ type: TokenTypes.rejected });
    }
  }

  const setDirection = async (payload: DirectionParam) => {
    dispatch({ type: TokenTypes.setDirection, payload });
    await requestHandler();
  };

  const setPerPage = async (payload: number) => {
    dispatch({ type: TokenTypes.setPerPage, payload });
    await requestHandler();
  };

  const onCreate = async (val: NewAccessToken) => {
    alert(`Copy this shit\n${val.plainTextToken}`)
    dispatch({ type: TokenTypes.addItem, payload: val.accessToken });
  }

  const onDelete = async (val: PersonalAccessToken) => {
    dispatch({ type: TokenTypes.removeItem, payload: val });
  }

  return (
    <div>
      <CreateAccessToken onCreate={val => onCreate(val)} />
      <div className="flex-col">
        <DirectionSelector
	disabled={ui.loading}
	selected={request.direction as DirectionParam}
	onChange={setDirection}
        />
        <PerPageSelector
	disabled={ui.loading}
	selected={request.per_page as number}
	onChange={setPerPage}
        />
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {data.data.map(accessToken => (
            <tr key={`access-token-${accessToken.id}`}>
              <td>{accessToken.id}</td>
              <td>{accessToken.name}</td>
              <td>{accessToken.created_at}</td>
              <td><DeleteTokenButton token={accessToken} onDelete={val => onDelete(val)} /> </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessTokens;
