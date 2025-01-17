/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";

const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="table-wrapper">{children}</div>;
};

export default Wrapper;
