import React from "react";

const Error = ({ children }) => {
  return (
    <div className="bg-red-200 rounded-md px-1.5 py-1 text-center text-red-800">
      {children}
    </div>
  );
};

export default Error;
