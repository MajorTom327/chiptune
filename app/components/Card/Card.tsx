import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  bodyClasses?: string;
};

export const Card: React.FC<Props> = ({ children, className, bodyClasses }) => {
  return (
    <>
      <div
        className={classNames(
          "card card-bordered bg-neutral shadow-xl",
          className
        )}
      >
        <div className={classNames("card-body", bodyClasses)}>{children}</div>
      </div>
    </>
  );
};

Card.defaultProps = {};

export default Card;
