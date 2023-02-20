import React from "react";

type Props = {};

export const Loader: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="flex justify-center items-center h-48 relative">
        <div className="absolute top-0 w-48 h-48 rounded-full border-t-4 border-b-4 border-accent animate-spin"></div>
        <div className="animate-pulse text-accent font-semibold text-lg">
          Loading...
        </div>
      </div>
    </>
  );
};

Loader.defaultProps = {};

export default Loader;
1;
