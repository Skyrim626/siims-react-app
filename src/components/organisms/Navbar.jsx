import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Search,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  LogOut,
} from "lucide-react";
import { Button, Input } from "@headlessui/react";
import Text from "../common/Text";
import { useAuth } from "../../hooks/useAuth";

const Navbar = ({ links = [] }) => {
  // Logout Function
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-md w-full transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side (Logo + Search) */}
        <div className="flex items-center space-x-4">
          {/* SIIMS Logo */}
          <Text className="text-blue-600 text-2xl font-bold cursor-pointer hover:text-blue-800 transition-colors duration-300">
            SIIMS
          </Text>

          {/* Search Bar */}
          <div className="relative flex items-center">
            <Input
              type="text"
              className="w-72 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search"
            />
            <Search
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer"
              size={18}
            />
          </div>
        </div>

        {/* Right side (Navigation Links) */}
        <div className="flex items-center gap-5">
          <div className="flex gap-5 self-end">
            {links.map((link, index) => {
              return (
                <NavItem
                  path={link.path}
                  key={index}
                  icon={link.icon}
                  text={link.text}
                />
              );
            })}
            <Button
              onClick={logout}
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300 ease-in-out"
              type="submit"
            >
              <div className="hover:scale-110 transform transition-transform duration-300">
                <LogOut size={20} />
              </div>
              <Text className="text-xs">Logout</Text>
            </Button>
          </div>

          {/* Profile Picture */}
          <div className="relative cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center flex-col">
            <img
              className="w-7 h-7 rounded-full shadow-md"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <Text className="text-xs">Me</Text>
          </div>
        </div>
      </div>
    </nav>
  );
};

// NavItem component using NavLink for active state
const NavItem = ({ path, icon, text }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      isActive
        ? "flex flex-col items-center text-blue-600 cursor-pointer transition-colors duration-300 ease-in-out"
        : "flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300 ease-in-out"
    }
  >
    <div className="hover:scale-110 transform transition-transform duration-300">
      {icon}
    </div>
    <Text className="text-xs">{text}</Text>
  </NavLink>
);

export default Navbar;
