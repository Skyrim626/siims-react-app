import React, { useState } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Section from "../../components/common/Section";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import Page from "../../components/common/Page";

// User type labels with routes to display the corresponding users
const userTypeLabels = [
  { to: "/auth/admin/users", role: "All" },
  { to: "/auth/admin/users/deans", role: "Deans" },
  { to: "/auth/admin/users/chairpersons", role: "Chairpersons" },
  { to: "/auth/admin/users/coordinators", role: "Coordinators" },
  { to: "/auth/admin/users/companies", role: "Companies" },
  { to: "/auth/admin/users/osa", role: "Osa" },
  { to: "/auth/admin/users/students", role: "Students" },
  { to: "/auth/admin/users/supervisors", role: "Supervisors" },
];

// Main Admin page component for managing users
const AdminManageUserSelection = () => {
  // Retrieve the current location from the router to highlight the active route
  const location = useLocation();

  // Current Path" /auth/admin/users
  // console.log(location.pathname);

  // Mapping routes to the headings that should be displayed
  const routeHeadings = {
    "/auth/admin/users": "Users",
    "/auth/admin/users/students": "Students",
    "/auth/admin/users/companies": "Companies",
    "/auth/admin/users/deans": "Deans",
    "/auth/admin/users/chairpersons": "Chairpersons",
    "/auth/admin/users/coordinators": "Coordinators",
    "/auth/admin/users/departments": "Departments",
  };

  // Mapping routes to the description/body texts to display under headings
  const routeBody = {
    "/auth/admin/users": "View different types of users.",
    "/auth/admin/users/students": "Use this module to enroll students.",
    "/auth/admin/users/companies": "Use this module to register companies.",
    "/auth/admin/users/deans": "Use this module to register companies.",
    "/auth/admin/users/chairpersons":
      "Use this module to register chairpersons.",
    "/auth/admin/users/coordinators":
      "Use this module to register coordinators.",
    "/auth/admin/users/departments": "Use this module to register departments.",
  };

  // Determine the heading and body text based on the current route
  const headingText = routeHeadings[location.pathname] || "Users";
  const bodyText =
    routeBody[location.pathname] || "View different types of users";

  return (
    <Page>
      <Section className="mt-4">
        <div className="flex justify-between items-center">
          {/* Display the heading and description */}
          <div>
            <Heading level={3} text={headingText} />
            <p className="text-blue-950 text-sm">{bodyText}</p>
          </div>
        </div>
        <hr className="my-3" />
      </Section>

      <Section>
        <div>
          {/* Render user role buttons dynamically based on the `userTypeLabels` array */}
          <div className="flex space-x-4">
            {userTypeLabels.map((userType, index) => {
              return (
                <Button
                  key={index}
                  isLink
                  to={userType.to}
                  className={`px-4 py-2 text-gray-900 border-b-2 text-sm ${
                    location.pathname === userType.to
                      ? "border-blue-600 text-blue-600 font-semibold"
                      : "hover:border-gray-900 transition"
                  }`}
                >
                  {userType.role}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Render nested pages using the `Outlet` component */}
        <Outlet />
      </Section>
    </Page>
  );
};

export default AdminManageUserSelection;
