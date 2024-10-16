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
  ];

  return (
    <div className="min-h-full">
      <Navbar links={studentLinks} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
