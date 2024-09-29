/* import {
  Disclosure,
  DisclosureButton,
  MenuButton,
  MenuItems,
  Menu,
  MenuItem,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import React from "react";

// Image Imports
import logo from "../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ companyLogo = logo, children }) {
  // Open Log out Function
  const { logout } = useAuth();

  return (
    <>
      <nav className="bg-gray-800 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img alt="Your Company" src={companyLogo} className="h-16" />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {children}
              </div>
            </div>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </>
  );
}
 */

// Libraries
import React, { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import profilePhoto from "../../assets/images/company/company-profile-photo.jpg";

// Components (Common)
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  // Dropdown state
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const location = useLocation();

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-md p-2">
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 text-sm focus:outline-none bg-transparent"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Bell Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() =>
              setShowNotificationDropdown(!showNotificationDropdown)
            }
            className="focus:outline-none"
          >
            <Bell size={24} className="text-gray-700" />
          </button>
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-4">
              <Heading level={6} text="Notifications" />
              <ul className="mt-2">
                <li className="text-sm text-gray-600">
                  New course available: React Basics
                </li>
                <li className="text-sm text-gray-600">
                  2 new messages from classmates
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="focus:outline-none"
          >
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
              <ul>
                <Link
                  to={`${location.pathname}/profile`}
                  className="text-sm text-gray-600 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                >
                  Profile
                </Link>
                <li className="text-sm text-gray-600 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                  Settings
                </li>
                <li className="text-sm text-red-600 hover:bg-red-100 p-2 rounded-md cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
