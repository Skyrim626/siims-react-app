import React, { useEffect, useState } from "react";
import Navbar from "../organisms/Navbar";
import {
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";
import { Home, CircleUserRound, FileText, File, FileClock } from "lucide-react";
import Loader from "../common/Loader";
import { getRequest } from "../../api/apiHelpers";
import { findBreadcrumbPath } from "../../utils/breadcrumbUtils";
import { studentSidebarItemsConfig } from "../sidebars/sidebarConfig";
import Breadcrumb from "../common/Breadcrumb";
import SidebarLayout from "./SidebarLayout";

export default function StudentLayout() {
  const location = useLocation();
  const params = useParams();

  const breadcrumbPaths = findBreadcrumbPath(
    location.pathname,
    studentSidebarItemsConfig,
    params || {} // Ensure params is an empty object if it's undefined
  ); // Use the helper

  return (
    <SidebarLayout sidebarItemsConfig={studentSidebarItemsConfig}>
      <main className="flex-1 overflow-auto">
        <Breadcrumb paths={breadcrumbPaths} />
        <Outlet />
      </main>
    </SidebarLayout>
  );
}

// Layout for Student Pages
function OLD_StudentLayout() {
  // Fetch auth student
  // const { auth } = useLoaderData();

  // Initialize loading and error
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  // Container State
  const [auth, setAuth] = useState({});

  const fetchAuth = async () => {
    // Set Loading State
    setLoading(true);

    try {
      // Initialize response
      const response = await getRequest({
        url: "/api/v1/student/auth",
      });

      // console.log(response);

      if (response) {
        setAuth(response);
      }
    } catch (error) {
      console.error(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  // Use Effect
  useEffect(() => {
    fetchAuth();
  }, []);

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

    /* {
      icon: <FileText size={20} />,
      text: "Endorsements",
      alert: true,
      ariaLabel: "Endorsements",
      exact: true,
      path: "/auth/my/endorsements",
    }, */

    {
      icon: <FileText size={20} />,
      text: "Reports",
      alert: true,
      ariaLabel: "Reports",
      exact: true,
      path: "/auth/my/reports",
    },

    /* {
      icon: <FileClock size={20} />,
      text: "Request Endorsement",
      alert: true,
      ariaLabel: "Endorsement",
      exact: true,
      path: "/auth/my/manual-request-endorsements",
    }, */

    {
      icon: <File size={20} />,
      text: "Documents",
      ariaLabel: "Documents",
      path: "/auth/my/documents",
      active: true,
      alert: true,
      exact: false,
      hidden: () => {
        return auth["latest_application"] ? false : true;
      },
    },

    /* {
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
    }, */
  ];

  // Return if loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  if (errors) {
    return <p>Error... Something is wrong.</p>;
  }

  return (
    <>
      <Navbar links={studentLinks} />
      <div className="min-h-screen bg-gray-100 relative">
        <div className="container mx-auto flex">
          <main className="w-full p-4 overflow-y-auto">
            <Outlet />
            <div className="space-y-4"></div>
          </main>
        </div>
      </div>
    </>
  );
}
