import React, { useEffect, useState } from "react";
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
    <Page>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <Text className="mb-8">
          Explore the latest job postings below and apply to the ones that
          interest you!
        </Text>

        <h2 className="text-xl font-semibold mb-4">Job Postings</h2>
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
                  <Text className="text-gray-500">{job.responsibilities}</Text>
                  <Text className="text-gray-700 mb-4">
                    {job.qualifications}
                  </Text>
                  <Text className="text-gray-500">
                    Start Date: {new Date(job.start_date).toLocaleDateString()}
                  </Text>
                  <Text className="text-gray-500">
                    End Date: {new Date(job.end_date).toLocaleDateString()}
                  </Text>
                  <p className="text-gray-500">Duration: {job.work_duration}</p>
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
  );
};

export default StudentHomePage;
