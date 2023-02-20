import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
};

export const Title: React.FC<Props> = ({
  children,
  className,
  center,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
}) => {
  const classes = classNames(
    "font-semibold",
    {
      "text-center": center,
      "text-2xl": h1,
      "text-xl": h2,
      "text-lg": h3,
      "text-base": h4,
      "text-sm": h5,
      "text-xs": h6,
    },
    className
  );

  return <h1 className={classes}>{children}</h1>;
};

Title.defaultProps = {};

export default Title;
