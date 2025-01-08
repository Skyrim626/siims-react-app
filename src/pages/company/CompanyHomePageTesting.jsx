import { Button } from "@headlessui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CompanyHomePageTesting = ({ details }) => {
  // Open Location
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {details.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your internships and immersions with ease and efficiency.
        </p>
      </header>

      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Current Interns", count: details.total_current_interns },
          {
            label: "Pending Applications",
            count: details.total_pending_applications,
          },
          { label: "Job Postings", count: details.total_work_posts },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg text-center border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {item.count}
            </h2>
            <p className="text-gray-500 mt-2">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            {
              label: "Add Job Post",
              action: () => navigate(`${location.pathname}/work-posts/add`),
            },
            {
              label: "Add Office",
              action: () => navigate(`${location.pathname}/offices/add`),
            },
            {
              label: "View Interns List",
              action: () => navigate(`${location.pathname}/reports`),
            },
          ].map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Internship and Immersion Management
        System. All rights reserved.
      </footer>
    </div>
  );
};

export default CompanyHomePageTesting;
