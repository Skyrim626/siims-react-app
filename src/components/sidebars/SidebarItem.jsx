// Libraries
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Context
import { SidebarContext } from "./Sidebar";
import Text from "../common/Text";

// SidebarItem Component
export default function SidebarItem({ icon, text, to, active, alert }) {
  const { expanded } = useContext(SidebarContext); // Get sidebar expansion state from context

  return (
    <NavLink
      to={to}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-blue-800 text-white font-semibold"
          : "hover:bg-blue-700 text-gray-50 font-bold"
      }`}
    >
      {icon}
      <Text
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </Text>

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {/* {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-700 text-gray-50 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )} */}

      {!expanded && (
        <div
          className={`absolute left-full ml-2 bg-blue-700 text-gray-50 text-sm px-2 py-1 rounded-md whitespace-nowrap invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}
