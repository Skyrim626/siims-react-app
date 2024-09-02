import React from "react";

// React Router Dom Libraries Imports
import { NavLink } from "react-router-dom";

export default function Button({
  children,
  className = "w-full py-3 bg-blue-600 rounded-sm",
  disabled = false,
  isLink = false,
  onClick,
  to = "#",
  type = "button",
}) {
  // A function that renders a button
  const renderButton = () => {
    return (
      <button onClick={onClick} className={`${className}`} type={type}>
        {children}
      </button>
    );
  };

  return (
    <>{isLink ? <NavLink to={to}>{renderButton()}</NavLink> : renderButton()}</>
  );
}
