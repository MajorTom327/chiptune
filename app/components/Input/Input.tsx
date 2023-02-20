import classNames from "classnames";
import { defaultTo } from "ramda";
import React, { useId } from "react";
import { FaAsterisk } from "react-icons/fa";

export type InputType = "text" | "email" | "password" | "number";
type Props = {
  type?: InputType;
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  defaultValue?: string;
};

export const Input: React.FC<Props> = ({
  type,
  placeholder,
  label,
  name,
  required,
  disabled,
  invalid,
  defaultValue,
}) => {
  const cleanPlaceholder = defaultTo(label, placeholder);
  const inputId = useId();

  const inputClasses = classNames("input input-bordered w-full", {
    "input-error": invalid,
  });

  return (
    <>
      {label && (
        <label className="label" htmlFor={inputId}>
          <span className="label-text flex gap-2 items-center">
            {label}
            {required && <FaAsterisk className="text-error text-sm" />}
          </span>
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={inputClasses}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        type={type}
        placeholder={cleanPlaceholder}
      />
    </>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
