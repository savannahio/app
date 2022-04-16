import React, { useReducer } from "react";
import {
  deleteTokenIS,
  deleteTokenReducer,
  DeleteTokenTypes
} from "@hooks/tokens/useDeleteToken";
import { accessTokenApi } from "@api/project";
import { PersonalAccessToken } from "project-ts";

interface Props {
  token: PersonalAccessToken
  onDelete: (val: PersonalAccessToken) => void
}

const DeleteTokenButton: React.FC<Props> = ({ token, onDelete }) => {
  const [{ ui }, dispatch] = useReducer(deleteTokenReducer, deleteTokenIS);

  const showConfirm = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('asdf')
    if (confirmed) {
      dispatch({ type: DeleteTokenTypes.setId, payload: token.id });
      await handleSubmit()
    }
  }
  const handleSubmit = async () => {
    try {
      dispatch({ type: DeleteTokenTypes.loading });
      await accessTokenApi.deleteToken({ id: token.id })
      dispatch({ type: DeleteTokenTypes.loaded });
      onDelete(token)
    } catch(error) {
      dispatch({ type: DeleteTokenTypes.rejected });
    }
  };

  return (
    <button type="button" disabled={ui.loading} onClick={showConfirm}>
      Delete
    </button>
  );
};

export default DeleteTokenButton;
