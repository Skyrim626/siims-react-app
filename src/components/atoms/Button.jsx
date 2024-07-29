import React from "react";

// React Router Dom Libraries Imports
import { NavLink } from "react-router-dom";

export default function Button({
  to = "#",
  isLink = false,
  type = "button",
  className = "w-full py-3 bg-blue-600 rounded-sm",
  children,
  onClick,
}) {
  // A function that renders a button
  const renderButton = () => {
    return (
      <button onClick={onClick} className={className} type={type}>
        {children}
      </button>
    );
  };

  return (
    <>{isLink ? <NavLink to={to}>{renderButton()}</NavLink> : renderButton()}</>
  );
}
