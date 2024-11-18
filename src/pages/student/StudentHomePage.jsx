import { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@headlessui/react";
import { getRequest } from "../../api/apiHelpers";
import Text from "../../components/common/Text";

const StudentHomePage = () => {
  // Location
  const location = useLocation();

  console.log(location.pathname);

  // Fetch State
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Maximum jobs per page

  // Use Effect Fetch
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRequest({
        url: "/api/v1/student/jobs",
      });

      setJobs(response);
    };

    fetchData();
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      <Page className="p-4 overflow-y-auto mx-auto">
        {/* New Post Box */}
        <header className="bg-blue-600 text-white py-4 shadow-md mb-3">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Home Page</h1>
            <p className="text-sm mt-1">
              Manage your Internship/Immersion Program efficiently.
            </p>
          </div>
        </header>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
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
        </div>

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
        <div className="flex-1">
          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Previous
            </Button>
            <Text className="self-center">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Next
            </Button>
          </div>
          <div className="mt-3">
            {jobs.length > 0 ? (
              <div className="space-y-4">
                {currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <Text className="text-gray-600">{job.company_name}</Text>
                    <Text className="text-gray-500">
                      {job.responsibilities}
                    </Text>
                    <Text className="text-gray-700 mb-4">
                      {job.qualifications}
                    </Text>
                    <Text className="text-gray-500">
                      Start Date:{" "}
                      {new Date(job.start_date).toLocaleDateString()}
                    </Text>
                    <Text className="text-gray-500">
                      End Date: {new Date(job.end_date).toLocaleDateString()}
                    </Text>
                    <p className="text-gray-500">
                      Duration: {job.work_duration}
                    </p>
                    <Button className="mt-3">
                      <NavLink
                        to={`${location.pathname}/apply/${job.id}`} // Link to the apply page for the job
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                      >
                        Apply Now
                      </NavLink>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Text>No jobs available</Text>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Previous
            </Button>
            <span className="self-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Next
            </Button>
          </div>
        </div>
      </Page>
    </>
  );
};

export default StudentHomePage;
