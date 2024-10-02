import React from "react";
import Navbar from "../organisms/Navbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  Box,
  Briefcase,
  Calendar,
  Handshake,
  HelpCircle,
  Home,
  MessageCircle,
  MessageSquare,
  Search,
  Users,
} from "lucide-react";
import NavItem from "../atoms/NavItem";
import profilePhoto from "../../assets/images/company/company-profile-photo.jpg";
import Text from "../common/Text";

// Layout for Student Pages
export default function StudentLayout() {
  const location = useLocation(); // Open Use Location

  // Customize Student Navigation Links
  const studentLinks = [
    {
      icon: <Home size={20} />,
      name: "Home",
      to: `${location.pathname}`,
      active: true,
      ariaLabel: "Home",
    },
  ];

  return (
    <div className="min-h-full">
      <div className="grid grid-cols-5 mt-16">
        <Navbar links={studentLinks} />
        <div className=" bg-white shadow-lg p-4 col-span-1">
          {/* User Info Section */}
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full shadow-md"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
            <div className="ml-2">
              <h3 className="font-bold">Student Name</h3>
              <p className="text-sm text-gray-600">Student Role</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow">
            {studentLinks.map((studentLink) => (
              <NavLink
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded ${
                    isActive ? "bg-gray-100" : "hover:bg-gray-100"
                  }`
                }
                to={`${studentLink.to}`}
              >
                {studentLink.icon} <Text>{studentLink.name}</Text>
              </NavLink>
            ))}
          </nav>

          {/* Additional Links / Sections */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Groups</h4>
            <ul>
              <li>
                <NavLink
                  to="/my/groups"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  My Groups
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my/create-group"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Create Group
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
