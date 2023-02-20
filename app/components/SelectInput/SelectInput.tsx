import classNames from "classnames";
import { isNotNilOrEmpty } from "ramda-adjunct";
import React, { useId } from "react";
import { FaAsterisk } from "react-icons/fa";

type Props = {
  required?: boolean;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  name: string;
  disabled?: boolean;
  invalid?: boolean;
  options: SelectOptions[];
};

export type SelectOptions = {
  label: string;
  value: string;
};

export const SelectInput: React.FC<Props> = ({
  required,
  label,
  placeholder,
  defaultValue,
  name,
  disabled,
  invalid,
  options,
}) => {
  const inputId = useId();

  const selectClasses = classNames("select select-bordered", {
    "select-error": invalid,
  });

  console.log("options", options);

  return (
    <>
      <div className="flex flex-col gap-2">
        {isNotNilOrEmpty(label) && (
          <label
            htmlFor={inputId}
            className={classNames("flex gap-2 items-center font-semibold", {
              "text-error": invalid,
            })}
          >
            <div>{label}</div>
            {required && <FaAsterisk className="text-error text-sm" />}
          </label>
        )}

        <select
          id={inputId}
          className={selectClasses}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          placeholder={placeholder}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};;;;;

SelectInput.defaultProps = {};

export default SelectInput;
