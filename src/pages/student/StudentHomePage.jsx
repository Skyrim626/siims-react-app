import { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@headlessui/react";
import { getRequest } from "../../api/apiHelpers";
import Text from "../../components/common/Text";

const StudentHomePage = () => {
  // Location
  const location = useLocation();

  // Fetch State
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");
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

  // Filtered Jobs based on Search and Filter
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterKeyword ? job.qualifications.toLowerCase().includes(filterKeyword.toLowerCase()) : true)
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <Page className="px-0">
      <div className="flex-1 ">
        {/* Header with My Applications Button */}
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-bold">Job Posts</h1>
          <NavLink
            to={`${location.pathname}/my-applications`} // Link to My Applications page
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors duration-200"
          >
            My Applications
          </NavLink>
        </div>

        {/* Search and Filter Section */}
        <div className="mt-4 flex gap-4">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-4 py-2 rounded w-full"
          />
          <select
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            className="border px-4 py-2 rounded w-1/3"
          >
            <option value="">All Keywords</option>
            <option value="developer">Developer</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="data analyst">Data Analyst</option>
            <option value="ui/ux">UI/UX Designer</option>
          </select>
        </div>

        {/* Job Listings */}
        <div className="mt-4 ">
          {filteredJobs.length > 0 ? (
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
                  <div className="mt-2">
                  <Text className="text-gray-500">
                    Start Date: {new Date(job.start_date).toLocaleDateString()}
                  </Text>
                  <Text className="text-gray-500">
                    End Date: {new Date(job.end_date).toLocaleDateString()}
                  </Text>
                </div>

                  <p className="text-gray-500">Duration: {job.work_duration}</p>
                  <Button className="mt-3">
                    <NavLink
                      to={`${location.pathname}/apply/${job.id}`} // Link to the apply page for the job
                      className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-950 transition-colors duration-200"
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
            className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200"
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
            className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200"
          >
            Next
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default StudentHomePage;
