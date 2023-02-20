import { Link } from "@remix-run/react";
import { isNotNilOrEmpty } from "ramda-adjunct";
import classNames from "classnames";
import React from "react";
import { defaultTo } from "ramda";

type Props = {
  children: React.ReactNode | string;
  onClick?: () => void;
  to?: string;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "link"
    | "info"
    | "success"
    | "warning"
    | "error";

  disabled?: boolean;
  loading?: boolean;
  circle?: boolean;
  square?: boolean;

  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;

  className?: string;
};

export const Button: React.FC<Props> = ({
  children,
  to,
  onClick,
  type,
  variant,

  disabled,
  circle,
  square,
  loading,

  xs,
  sm,
  md,
  lg,

  className,
}) => {
  const classes = classNames(
    "btn",
    {
      "btn-primary": variant === "primary",
      "btn-secondary": variant === "secondary",
      "btn-accent": variant === "accent",
      "btn-ghost": variant === "ghost",
      "btn-link": variant === "link",
      "btn-info": variant === "info",
      "btn-success": variant === "success",
      "btn-warning": variant === "warning",
      "btn-error": variant === "error",
    },
    {
      "btn-xs": xs,
      "btn-sm": sm,
      "btn-md": md,
      "btn-lg": lg,
    },
    {
      "btn-circle": circle === true,
      "btn-square": square === true,
      "btn-loading": loading === true,
    },
    className
  );

  if (isNotNilOrEmpty(to) && !disabled) {
    return (
      <Link className={classes} to={to!}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={defaultTo("button", type)}
    >
      {children}
    </button>
  );
};

export default Button;
