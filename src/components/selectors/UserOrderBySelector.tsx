import React from "react";
import { UserOrderBy } from "api-ts-axios";

interface Props {
  disabled?: boolean;
  selected: UserOrderBy;
  onChange: (val: UserOrderBy) => void;
}

const UserOrderBySelector: React.FC<Props> = ({
  disabled = false,
  selected,
  onChange,
}) => {
  const changeHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) =>
    onChange(event.target.value as UserOrderBy);

  const mapOptions = (): Array<React.ReactElement<HTMLOptionElement>> =>
    (Object.keys(UserOrderBy) as (keyof typeof UserOrderBy)[]).map((key) => (
      <option
	key={`order-by-selector-option-${UserOrderBy[key]}`}
	value={UserOrderBy[key]}
      >
        {key}
      </option>
    ));

  return (
    <select disabled={disabled} value={selected} onChange={changeHandler}>
      {mapOptions()}
    </select>
  );
};

export default UserOrderBySelector;
