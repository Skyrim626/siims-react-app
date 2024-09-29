import React from "react";
import Navbar from "../organisms/Navbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  Box,
  Calendar,
  Handshake,
  HelpCircle,
  Home,
  MessageCircle,
  MessageSquare,
  Search,
} from "lucide-react";
import NavItem from "../atoms/NavItem";
import profilePhoto from "../../assets/images/company/company-profile-photo.jpg";

// Customize Student Navigation Links
const navlinks = [
  {
    icon: <HelpCircle size={20} />,
    name: "Help",
    to: "help",
    active: true,
    ariaLabel: "Help",
  },
  {
    icon: <Handshake />,
    name: "Internship Offers",
    to: "internship-offers",
    active: true,
    ariaLabel: "Internship Offers",
  },
  {
    icon: <Box size={20} />,
    name: "Storage",
    to: "storage",
    active: true,
    ariaLabel: "Storage",
  },
  { isDivider: true },
  {
    icon: <Home size={20} />,
    name: "Home",
    to: "home",
    active: true,
    ariaLabel: "Home",
  },
  {
    icon: <MessageCircle size={20} />,
    name: "Messages",
    to: "messages",
    active: true,
    ariaLabel: "Messages",
  },
  {
    icon: <Calendar size={20} />,
    name: "Calendar",
    to: "calendar",
    active: true,
    ariaLabel: "Calendar",
  },
  {
    icon: <Bell size={20} />,
    name: "Notifications",
    to: "notifications",
    active: true,
    ariaLabel: "Notifications",
  },
];

// Layout for Student Pages
export default function StudentLayout() {
  const location = useLocation(); // Open Use Location

  return (
    <div className="min-h-full">
      {/* <Navbar>
        {navlinks.map((navlink, index) => {
          return (
            <NavItem
              className="text-white font-light"
              key={index}
              icon={navlink.icon}
              name={navlink.name}
              to={navlink.to}
              active={location.pathname === navlink.to} // Set active state based on current path
              ariaLabel={navlink.ariaLabel}
            />
          );
        })}
      </Navbar> */}
      <Navbar />
      <Outlet />
    </div>
  );
}
