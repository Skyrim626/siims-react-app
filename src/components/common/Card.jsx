import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`border rounded-lg shadow-sm p-6 bg-white ${className} hover:shadow-md`}
    >
      {children}
    </div>
  );
};

export default Card;
