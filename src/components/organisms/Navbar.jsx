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
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Left side (Logo + Search) */}
        <div className="flex items-center space-x-4">
          {/* SIIMS Logo */}
          <div className="text-blue-600 text-2xl font-bold cursor-pointer hover:text-blue-800 transition-colors duration-300">
            SIIMS
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              className="w-72 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search"
            />
            <Search
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              size={18}
            />
          </div>
        </div>

        {/* Right side (Navigation Links) */}
        <div className="flex space-x-6 items-center">
          {links.map((link, index) => (
            <NavItem
              to={link.to}
              key={index}
              icon={link.icon}
              label={link.name}
            />
          ))}
          <Button onClick={logout} className="" type="submit">
            <LogOut
              className="transition text-white cursor-pointer hover:text-blue-500"
              size={20}
            />
          </Button>

          {/* Profile Picture */}
          <div className="relative cursor-pointer hover:scale-105 transition-transform duration-300">
            <img
              className="w-8 h-8 rounded-full shadow-md"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

// NavItem component using NavLink for active state
const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "flex flex-col items-center text-blue-600 cursor-pointer transition-colors duration-300 ease-in-out"
        : "flex flex-col items-center text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300 ease-in-out"
    }
  >
    <div className="hover:scale-110 transform transition-transform duration-300">
      {icon}
    </div>
    <Text className="text-xs">{label}</Text>
  </NavLink>
);

export default Navbar;
