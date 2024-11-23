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

const StudentHomePage = () => {
  // Fetch initial_workPost_posts
  const { workPosts, student, currently_applied_work_post, application_id } =
    useLoaderData();
  // console.log(workPosts);
  // console.log(student);

  // Location and Navigate
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch State
  const studentStatus = student["status_id"] || 8;
  // console.log(studentStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const workPostsPerPage = 5; // Maximum workPost per page

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkPostId, setSelectedWorkPostId] = useState(null);

  // Calculate the total number of pages
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

  return (
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
        {/* Deployed - 12 */}
        {studentStatus === 12 && (
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
                  className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Job Details */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {workPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium mb-2">
                      {workPost.company_name}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                      {workPost.responsibilities}
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>
                        <span className="font-semibold">Start Date:</span>{" "}
                        {workPost.start_date}
                      </p>
                      <p>
                        <span className="font-semibold">End Date:</span>{" "}
                        {workPost.end_date}
                      </p>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="bg-gray-100 px-5 py-4 flex justify-between items-center">
                    <button
                      onClick={() => handleApplyClick(workPost.id)}
                      className={`px-4 py-2 rounded-md font-medium text-white transition ${
                        workPost.is_closed
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={workPost.is_closed}
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => navigate(`/job-details/${workPost.id}`)}
                      className="px-4 py-2 rounded-md font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                      View Job
                    </button>
                  </div>
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

        {/* If the student already applied, display this */}
        {/* If the student already applied, display this */}
        {currently_applied_work_post && (
          <div className="container mx-auto mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Currently Applied Job
            </h2>
            <div
              key={currently_applied_work_post.id}
              className="bg-white shadow-md rounded-lg p-6 transition-all transform hover:scale-105 duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {currently_applied_work_post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                <span className="font-semibold">Responsibilities:</span>{" "}
                {currently_applied_work_post.responsibilities}
              </p>
              <div className="flex flex-col space-y-2 mb-4">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Start Date:</span>{" "}
                  {new Date(
                    currently_applied_work_post.start_date
                  ).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">End Date:</span>{" "}
                  {new Date(
                    currently_applied_work_post.end_date
                  ).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 mt-4">
                <Button
                  onClick={() =>
                    handleApplyClick(currently_applied_work_post.id)
                  }
                  className="w-full sm:w-auto py-2 px-6 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
                >
                  Withdraw
                </Button>
                <Button
                  onClick={navigateToApplication}
                  className="w-full sm:w-auto py-2 px-6 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
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
