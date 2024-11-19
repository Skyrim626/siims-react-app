import { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import {
  NavLink,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button, Dialog } from "@headlessui/react";
import { getRequest, postRequest } from "../../api/apiHelpers";
import Text from "../../components/common/Text";

/**
 *
 * Status_id of Student Display Features:
 * 08 - Not yet applied - [Display Job List Features]
 * 09 - Applying        - [Display Job List Features]
 * 10 - Applied         - [Hide Job List Features, Display Reports Features]
 */

<<<<<<< HEAD
const StudentHomePage = () => {
  // Fetch initial_workPost_posts
  const { workPosts, student, currently_applied_work_post, application_id } =
    useLoaderData();
  // console.log(workPosts);
  // console.log(student);

  // Location and Navigate
  const location = useLocation();
  const navigate = useNavigate();

=======
>>>>>>> deez
  // Fetch State
  const studentStatus = student["status_id"] || 8;
  // console.log(studentStatus);
  const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
  const workPostsPerPage = 5; // Maximum workPost per page
=======
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");
  const jobsPerPage = 5; // Maximum jobs per page
>>>>>>> deez

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkPostId, setSelectedWorkPostId] = useState(null);

  // Filtered Jobs based on Search and Filter
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterKeyword ? job.qualifications.toLowerCase().includes(filterKeyword.toLowerCase()) : true)
  );

  // Calculate the total number of pages
<<<<<<< HEAD
  const totalPages = Math.ceil(workPosts.length / workPostsPerPage);

  // Get the workPosts for the current page
  const indexOfLastWorkPost = currentPage * workPostsPerPage;
  const indexOfFirstWorkPost = indexOfLastWorkPost - workPostsPerPage;
  const currentWorkPost = workPosts.slice(
    indexOfFirstWorkPost,
    indexOfLastWorkPost
  );

  // Modal Logic
  const handleApplyClick = (workPostId) => {
    setSelectedWorkPostId(workPostId);
    setIsModalOpen(true);
  };

  const navigateToApplication = () => {
    // console.log(`${location.pathname}/application/${application_id}`);
    const to = `${location.pathname}/applications/${application_id}`;

    // apply/:job_id
    navigate(to);
  };

  const handleConfirmApply = async () => {
    // Method POST
    // Create a new application record
    try {
      const response = await postRequest({
        url: `/api/v1/student/jobs/${selectedWorkPostId}/apply`,
      });

      console.log(response);

      setIsModalOpen(false);

      if (response) {
        navigate(
          `${location.pathname}/applications/${response.application_id}`
        );
      }
    } catch (error) {
      // Handle and set errors
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };
=======
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
>>>>>>> deez

  return (
<<<<<<< HEAD
    <>
      <Page className="p-4 overflow-y-auto mx-auto">
        {/* New Post Box */}
        <header className="bg-blue-600 text-white py-4 shadow-md mb-3">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Home Page</h1>
            <p className="text-sm mt-1">
              Browse Job Lists for Internship and Immersion
            </p>
          </div>
        </header>
        {/* Reports Section */}
        {/* Applied - 10 */}
        {studentStatus === 10 && (
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
        )}

<<<<<<< HEAD
        {/* WorkPost List Section */}
        {/* Not yet applied - 10 */}
        {studentStatus === 8 && (
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Available Internships
            </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {currentWorkPost.map((workPost) => (
                <div
                  key={workPost.id}
                  className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
                >
                  <h3 className="text-xl font-bold mb-2">{workPost.title}</h3>
                  <Text className="text-gray-600 mb-2">
                    {workPost.company_name}
                  </Text>
                  <Text className="text-gray-500 mb-4 line-clamp-2">
                    {workPost.responsibilities}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Start Date:{" "}
                    {new Date(workPost.start_date).toLocaleDateString()}
                  </Text>
                  <Text className="text-sm text-gray-500 mb-4">
                    End Date: {new Date(workPost.end_date).toLocaleDateString()}
                  </Text>
                  <button
                    onClick={() => handleApplyClick(workPost.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
=======
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
=======
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
>>>>>>> c8f994ff51d6db31ec6121b2219d8d32466dfcfd
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
>>>>>>> deez
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* If the student already applied then display this */}
        {currently_applied_work_post && (
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Currently Applied Job
            </h2>
            <div
              key={currently_applied_work_post.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform transform"
            >
              <h3 className="text-xl font-bold mb-2">
                {currently_applied_work_post.title}
              </h3>
              <Text className="text-gray-600 mb-2">
                {currently_applied_work_post.company_name}
              </Text>
              <Text className="text-gray-500 mb-4 line-clamp-2">
                {currently_applied_work_post.responsibilities}
              </Text>
              <Text className="text-sm text-gray-500">
                Start Date:{" "}
                {new Date(
                  currently_applied_work_post.start_date
                ).toLocaleDateString()}
              </Text>
              <Text className="text-sm text-gray-500 mb-4">
                End Date:{" "}
                {new Date(
                  currently_applied_work_post.end_date
                ).toLocaleDateString()}
              </Text>
              <div className="mt-2 space-x-3">
                <Button
                  onClick={() =>
                    handleApplyClick(currently_applied_work_post.id)
                  }
                  className="p-3 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Withdraw
                </Button>
                <Button
                  onClick={navigateToApplication}
                  className="p-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Application
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Dialog.Panel className="bg-white rounded-lg p-6 shadow-lg w-96">
            <Dialog.Title className="text-lg font-bold mb-4">
              Confirm Application
            </Dialog.Title>
            <Dialog.Description className="mb-4 text-gray-600">
              Are you sure you want to apply for this workPost?
            </Dialog.Description>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmApply}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                No
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Page>
    </>
  );
};

export default StudentHomePage;
