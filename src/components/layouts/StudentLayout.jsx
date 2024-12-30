import React from "react";
import Navbar from "../organisms/Navbar";
import { NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Home, CircleUserRound, FileText } from "lucide-react";

// Layout for Student Pages
export default function StudentLayout() {
  // Fetch auth student
  const { auth } = useLoaderData();

  // console.log(auth);

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
      icon: <FileText size={20} />,
      text: "My Reports",
      path: "/auth/my/my-reports",
      active: true,
      ariaLabel: "My Reports",
      alert: true,
      exact: false,
      hidden: () => {
        // Shows the My Reports if the student is now at status_id 10
        return auth["student_status_id"] !== 12;
      },
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
