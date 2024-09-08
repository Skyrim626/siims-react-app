import {
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
