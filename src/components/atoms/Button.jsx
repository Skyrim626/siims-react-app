import React from "react";

// React Router Dom Libraries Imports
import { NavLink } from "react-router-dom";
import {
  pickBackgroundColor,
  pickHoverBackgroundColor,
  pickTextColor,
} from "../../config/style";

export default function Button({
  bgColor,
  color,
  children,
  className = "w-full py-3 bg-blue-600 rounded-sm",
  disabled = false,
  hoverBgColor,
  isLink = false,
  onClick,
  to = "#",
  type = "button",
}) {
  // A function that renders a button
  const renderButton = () => {
    // Returns button background
    const pickedBackgroundColor = pickBackgroundColor(bgColor);

    // Returns text color
    const pickedTextColor = pickTextColor(color);

    // Returns hover color
    const pickedHoverBackgroundColor = pickHoverBackgroundColor(hoverBgColor);

    return (
      <button
        onClick={onClick}
        className={`${pickedBackgroundColor} ${
          hoverBgColor && pickedHoverBackgroundColor
        } ${pickedTextColor} ${className}`}
        type={type}
      >
        {children}
      </button>
    );
  };

  return (
    <>{isLink ? <NavLink to={to}>{renderButton()}</NavLink> : renderButton()}</>
  );
}
