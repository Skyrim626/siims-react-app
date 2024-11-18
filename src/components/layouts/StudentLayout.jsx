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
  CircleUserRound,
  Users,
  School,
  Briefcase,
} from "lucide-react";
import NavItem from "../atoms/NavItem";
import profilePhoto from "../../assets/images/company/company-profile-photo.jpg";
import Text from "../common/Text";
import SidebarLayout from "./SidebarLayout";

// Layout for Student Pages
export default function StudentLayout() {
  const location = useLocation(); // Open Use Location

  // Customize Student Navigation Links
  const studentLinks = [
    {
      icon: <Home size={20} />,
      text: "Home",
      path: "/auth/my",
      active: true,
      ariaLabel: "Home",
      alert: true,
      exact: false,
    },
    {
      icon: <CircleUserRound size={20} />,
      text: "Profile",
      path: "/auth/my/profile",
      active: true,
      ariaLabel: "Profile",
      alert: true,
      exact: false,
    },
    {
      icon: <Briefcase size={20} />,
      text: "Jobs",
      path: "/auth/my/jobs",
      active: true,
      ariaLabel: "Jobs",
      alert: true,
      exact: false,
    },
    {
      icon: <School size={20} />,
      text: "Program",
      path: "/auth/my/program",
      active: true,
      ariaLabel: "Program",
      alert: true,
      exact: false,
    },
  ];

  return (
    <>
      <Navbar links={studentLinks} />
      <div className="min-h-screen bg-gray-100 relative">
        <div className="container mx-auto flex">
          <main className="w-full p-4 overflow-y-auto">
            {/* Content Feed */}
            <Outlet />
            <div className="space-y-4"></div>
          </main>
        </div>
      </div>
    </>
  );
}
