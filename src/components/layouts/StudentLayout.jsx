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
          {/* Left Sidebar */}
          <aside className="w-1/4 p-4 max-h-screen sticky top-[80px] overflow-y-auto">
            {/* Profile Summary */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <img
                src="/profile-pic.jpg"
                alt="Profile"
                className="w-16 h-16 rounded-full mx-auto"
              />
              <h2 className="mt-2 text-center font-semibold">John Doe</h2>
              <p className="text-center text-gray-500 text-sm">
                Software Engineer
              </p>
              <div className="mt-4 flex flex-col items-center">
                <button className="text-blue-600 font-semibold">
                  View Profile
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Recent</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-700 hover:underline">
                    #ReactJS
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:underline">
                    #WebDevelopment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:underline">
                    #TailwindCSS
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* Feed Section */}

          {/* Posts Feed */}
          <Outlet />
        </div>
      </div>
    </>
  );
}
