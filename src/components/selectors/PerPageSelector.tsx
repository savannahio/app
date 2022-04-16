import React from "react";

const DEFAULT_OPTIONS = [20, 40, 100];

interface Props {
  disabled?: boolean;
  options?: Array<number>;
  selected: number;
  onChange: (val: number) => void;
}

const PerPageSelector: React.FC<Props> = ({
  disabled = false,
  options = DEFAULT_OPTIONS,
  selected,
  onChange,
}) => {
  const changeHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) =>
    onChange(event.target.value as unknown as number);

  const mapOptions = (): Array<React.ReactElement<HTMLOptionElement>> =>
    options.map((key) => (
      <option key={`page-selector-option-${key}`} value={key}>
        {key}
      </option>
    ));

  return (
    <select disabled={disabled} value={selected} onChange={changeHandler}>
      {mapOptions()}
    </select>
  );
};

export default PerPageSelector;
