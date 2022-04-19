import React from "react";
import { routes } from "@routes";

interface Props {
  disabled?: boolean;
  horizon: boolean
  telescope: boolean
  documentation: boolean
  onChange: (value: string) => void;
}

const ApiDocsSelector: React.FC<Props> = ({
  disabled = false, horizon, telescope, documentation, onChange,
}) => {

  const changeHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) =>
    onChange(event.target.value);

  return (
    <select value="label" aria-label="asdf" disabled={disabled} onChange={changeHandler}>
      <option value="label">Api</option>
      {horizon && <option value={routes.api.horizon.path}>{routes.api.horizon.name}</option>}
      {telescope && <option value={routes.api.telescope.path}>{routes.api.telescope.name}</option>}
      {documentation && <option value={routes.api.documentation.path}>{routes.api.documentation.name}</option>}
    </select>
  );
};

export default ApiDocsSelector;
