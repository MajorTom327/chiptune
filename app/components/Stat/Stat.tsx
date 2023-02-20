import classNames from "classnames";
import React from "react";

type Props = {
  label: string;
  value: string | number;
  description?: string;
  format?: (value: string | number) => string;
  variant?: "primary" | "secondary" | "accent";
};

export const Stat: React.FC<Props> = ({
  label,
  description,
  value,
  format,
  variant,
}) => {
  const classes = classNames("stat-value", {
    "text-primary": variant === "primary",
    "text-secondary": variant === "secondary",
    "text-accent": variant === "accent",
  });
  return (
    <>
      <div className="stat">
        <div className="stat-title">{label}</div>
        <div className={classes}>{format!(value)}</div>
        {description && <div className="stat-desc">{description}</div>}
      </div>
    </>
  );
};

Stat.defaultProps = {
  format: (value: string | number) => value.toString(),
};

export default Stat;
