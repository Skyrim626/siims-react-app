import React from "react";

const CompanyHomePageTesting = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, [Company Name]!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your internships and immersions with ease and efficiency.
        </p>
      </header>

      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Current Interns", count: 25 },
          { label: "Pending Applications", count: 10 },
          { label: "Job Postings", count: 5 },
          { label: "Completion Rates", count: "80%" },
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
              label: "Add Internship Posting",
              action: () => alert("Add Internship Posting"),
            },
            {
              label: "Review Applications",
              action: () => alert("Review Applications"),
            },
            {
              label: "View Interns List",
              action: () => alert("View Interns List"),
            },
            {
              label: "Generate Reports",
              action: () => alert("Generate Reports"),
            },
          ].map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition"
            >
              {action.label}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Activities */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <ul className="bg-white shadow-md p-6 rounded-lg space-y-4 border border-gray-200">
          {[
            "John Doe applied for Software Engineer Intern.",
            "Jane Smith submitted her progress report.",
            "Team meeting scheduled for January 10, 2025.",
          ].map((activity, index) => (
            <li key={index} className="text-gray-700">
              {activity}
            </li>
          ))}
        </ul>
      </section>

      {/* Notifications Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Notifications
        </h2>
        <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600">No new notifications at the moment.</p>
        </div>
      </section>

      {/* Insights and Analytics */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Insights and Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Intern Distribution
            </h3>
            <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
              <p className="text-gray-500 italic">Graph/Chart Placeholder</p>
            </div>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Performance Metrics
            </h3>
            <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
              <p className="text-gray-500 italic">
                Performance Data Placeholder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Events
        </h2>
        <ul className="bg-white shadow-md p-6 rounded-lg space-y-4 border border-gray-200">
          {[
            "Application deadline: January 15, 2025.",
            "Interview with interns: January 20, 2025.",
          ].map((event, index) => (
            <li key={index} className="text-gray-700">
              {event}
            </li>
          ))}
        </ul>
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
