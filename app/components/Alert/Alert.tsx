import classNames from "classnames";
import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

type AlertVariant = "success" | "error" | "warning" | "info";

type Props = {
  children?: React.ReactElement | string | React.ReactElement[];
  variant?: AlertVariant;
};

const getIcon = (variant: AlertVariant) => {
  if (variant === "success") return <FaCheckCircle />;
  if (variant === "error") return <FaExclamationTriangle />;
  if (variant === "warning") return <FaTimesCircle />;
  if (variant === "info") return <FaInfoCircle />;
  return null;
};

export const Alert: React.FC<Props> = ({ variant, children }) => {
  const classes = classNames("alert", {
    "alert-success": variant === "success",
    "alert-error": variant === "error",
    "alert-warning": variant === "warning",
    "alert-info": variant === "info",
  });

  return (
    <>
      <div className={classes}>
        <div>
          {getIcon(variant || "info")}
          {children}
        </div>
      </div>
    </>
  );
};

Alert.defaultProps = {};

export default Alert;
