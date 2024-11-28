import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation.

const CompanyDashboard = () => {
  const navigate = useNavigate();

  const overviewData = {
    totalInternships: 12,
    totalInterns: 48,
    supervisors: 5,
  };

  const pendingApplications = [
    {
      id: 1,
      name: "John Doe",
      program: "BS in Computer Science",
      jobTitle: "Software Developer Intern",
      dateSubmitted: "2024-11-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      program: "BS in Information Technology",
      jobTitle: "Data Analyst Intern",
      dateSubmitted: "2024-11-21",
    },
    {
      id: 3,
      name: "Michael Lee",
      program: "BS in Electronics Engineering",
      jobTitle: "Hardware Engineer Intern",
      dateSubmitted: "2024-11-21",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Company Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Overview Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div
              onClick={() => navigate("/auth/company/work-posts")}
              className="bg-white p-6 shadow rounded-md flex items-center space-x-4 cursor-pointer hover:bg-blue-50 transition"
            >
              <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                <i className="fas fa-briefcase text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold">Total Internships</h3>
                <p className="text-2xl font-semibold">{overviewData.totalInternships}</p>
              </div>
            </div>
            {/* Card 2 */}
            <div
              onClick={() => navigate("/auth/company/interns")}
              className="bg-white p-6 shadow rounded-md flex items-center space-x-4 cursor-pointer hover:bg-green-50 transition"
            >
              <div className="bg-green-100 p-4 rounded-full text-green-600">
                <i className="fas fa-user-graduate text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold">Total Interns</h3>
                <p className="text-2xl font-semibold">{overviewData.totalInterns}</p>
              </div>
            </div>
            {/* Card 3 */}
            <div
              onClick={() => navigate("/auth/company/supervisors")}
              className="bg-white p-6 shadow rounded-md flex items-center space-x-4 cursor-pointer hover:bg-yellow-50 transition"
            >
              <div className="bg-yellow-100 p-4 rounded-full text-yellow-600">
                <i className="fas fa-users-cog text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold">Supervisors</h3>
                <p className="text-2xl font-semibold">{overviewData.supervisors}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Applications Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Pending Review Applications</h2>
          <div className="bg-white shadow rounded-md overflow-hidden">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Program</th>
                  <th className="px-6 py-3 font-semibold">Internship Job Title</th>
                  <th className="px-6 py-3 font-semibold">Date Submitted</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingApplications.map((application) => (
                  <tr key={application.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{application.name}</td>
                    <td className="px-6 py-4">{application.program}</td>
                    <td className="px-6 py-4">{application.jobTitle}</td>
                    <td className="px-6 py-4">{application.dateSubmitted}</td>
                    <td className="px-6 py-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyDashboard;
