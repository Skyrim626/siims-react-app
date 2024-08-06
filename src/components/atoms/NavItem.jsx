import React from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({
  icon,
  name,
  ariaLabel,
  to,
  active,
  className,
}) {
  return (
    <NavLink
      aria-label={ariaLabel}
      className={`flex flex-col items-center justify-center ${className}`}
    >
      {icon}
      {name}
    </NavLink>
  );
}
