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
      <Page className="w-1/2 p-4 overflow-y-auto">
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
              <button className="text-blue-600 font-semibold">Connect</button>
            </li>
            <li className="flex items-center space-x-3">
              <img
                src="/profile-pic.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">Pam Beesly</h4>
                <p className="text-sm text-gray-500">Office Administrator</p>
              </div>
              <button className="text-blue-600 font-semibold">Connect</button>
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
    </>
  );
};

export default StudentHomePage;
