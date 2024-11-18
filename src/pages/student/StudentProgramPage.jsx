

const StudentProgramPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Program Dashboard</h1>
          <p className="text-sm mt-1">Manage your Internship/Immersion Program efficiently.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Program Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Program Type:</strong> Internship</p>
            <p><strong>Status:</strong> Ongoing</p>
            <p><strong>Company:</strong> ABC Corp.</p>
            <p><strong>Supervisor:</strong> John Doe</p>
            <p><strong>Start Date:</strong> 10/01/2024</p>
            <p><strong>End Date:</strong> 12/31/2024</p>
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Reports</h2>
          <div className="flex flex-wrap gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Manage DTR
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Submit Weekly Report
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
              Personal Insights
            </button>
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Program Progress</h2>
          <div>
            <p className="mb-2"><strong>Rendered Hours:</strong> 120 / 200</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul className="list-disc list-inside">
            <li>Reminder: Weekly Report for Week 3 is due on 11/20/2024.</li>
            <li>Your DTR for Week 2 has been approved.</li>
          </ul>
        </section>

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Submitted Documents</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">Application Letter</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Resume</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">DTRs</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Weekly Reports</a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default StudentProgramPage;
