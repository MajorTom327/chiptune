import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Stats: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="stats bg-neutral">{children}</div>
    </>
  );
};

Stats.defaultProps = {};

export default Stats;
