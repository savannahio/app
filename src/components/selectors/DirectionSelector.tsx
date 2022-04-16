import React from "react";
import { DirectionParam } from "project-ts";

interface Props {
  disabled?: boolean;
  selected: DirectionParam;
  onChange: (value: DirectionParam) => void;
}

const DirectionSelector: React.FC<Props> = ({
  disabled = false,
  selected,
  onChange,
}) => {
  const changeHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) =>
    onChange(event.target.value as DirectionParam);

  const mapOptions = (): Array<React.ReactElement<HTMLOptionElement>> =>
    (Object.keys(DirectionParam) as (keyof typeof DirectionParam)[]).map(
      (key) => (
        <option
	key={`direction-selector-option-${DirectionParam[key]}`}
	value={DirectionParam[key]}
        >
          {key.toUpperCase()}
        </option>
      )
    );

  return (
    <select disabled={disabled} value={selected} onChange={changeHandler}>
      {mapOptions()}
    </select>
  );
};

export default DirectionSelector;
