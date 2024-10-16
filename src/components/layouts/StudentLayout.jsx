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
  Users,
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
      icon: <Briefcase size={20} />,
      text: "Jobs",
      path: "/auth/my/jobs",
      active: true,
      ariaLabel: "Jobs",
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
          <main className="w-1/2 p-4 overflow-y-auto">
            {/* New Post Box */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <input
                type="text"
                placeholder="Start a post"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <div className="mt-2 flex space-x-4">
                <button className="text-blue-600">Photo</button>
                <button className="text-blue-600">Video</button>
                <button className="text-blue-600">Event</button>
              </div>
            </div>

            {/* Posts Feed */}
            <Outlet />
            <div className="space-y-4">
              {/* Post 1 */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Jane Doe</h3>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">
                  Excited to share my latest project with you all!
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="text-blue-600">Like</button>
                  <button className="text-blue-600">Comment</button>
                  <button className="text-blue-600">Share</button>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Alex Smith</h3>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">
                  Just attended an amazing webinar on React and Web Development!
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="text-blue-600">Like</button>
                  <button className="text-blue-600">Comment</button>
                  <button className="text-blue-600">Share</button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Alex Smith</h3>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">
                  Just attended an amazing webinar on React and Web Development!
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="text-blue-600">Like</button>
                  <button className="text-blue-600">Comment</button>
                  <button className="text-blue-600">Share</button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Alex Smith</h3>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">
                  Just attended an amazing webinar on React and Web Development!
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="text-blue-600">Like</button>
                  <button className="text-blue-600">Comment</button>
                  <button className="text-blue-600">Share</button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Alex Smith</h3>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">
                  Just attended an amazing webinar on React and Web Development!
                </p>
                <div className="mt-4 flex space-x-4">
                  <button className="text-blue-600">Like</button>
                  <button className="text-blue-600">Comment</button>
                  <button className="text-blue-600">Share</button>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-1/4 p-4 max-h-screen sticky top-[80px] overflow-y-auto">
            {/* Recommendations */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h3 className="font-semibold">People You May Know</h3>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center space-x-3">
                  <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Michael Scott</h4>
                    <p className="text-sm text-gray-500">Regional Manager</p>
                  </div>
                  <button className="text-blue-600 font-semibold">
                    Connect
                  </button>
                </li>
                <li className="flex items-center space-x-3">
                  <img
                    src="/profile-pic.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Pam Beesly</h4>
                    <p className="text-sm text-gray-500">
                      Office Administrator
                    </p>
                  </div>
                  <button className="text-blue-600 font-semibold">
                    Connect
                  </button>
                </li>
              </ul>
            </div>

            {/* Job Suggestions */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">Recommended Jobs</h3>
              <ul className="space-y-2 mt-2">
                <li>
                  <a href="#" className="text-gray-700 hover:underline">
                    Frontend Developer at XYZ Corp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:underline">
                    Fullstack Engineer at ABC Inc.
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
