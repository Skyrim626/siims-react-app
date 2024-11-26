import { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import {
  Link,
  NavLink,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button, Dialog } from "@headlessui/react";
import { getRequest, postRequest } from "../../api/apiHelpers";
import Text from "../../components/common/Text";
import Loader from "../../components/common/Loader";
import ApplyModal from "../../components/workPosts/ApplyModal";
import WithdrawModal from "../../components/workPosts/WithdrawModal";
/**
 *
 * Status_id of Student Display Features:
 * 08 - Not yet applied - [Display Job List Features]
 * 09 - Applying        - [Display Job List Features]
 * 10 - Applied         - [Hide Job List Features, Display Reports Features]
 */

const StudentHomePage = () => {
  // Fetch initial_workPost_posts
  const {
    workPosts,
    student,
    currently_applied_work_post,
    application_id,
    status,
  } = useLoaderData();
  // console.log(currently_applied_work_post);
  // console.log(student);
  // console.log(status);

  // Loading State
  const [loading, setLoading] = useState(false);

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
  const [isWithdrawModalOpen, setIsWithdrawalModalOpen] = useState(false);
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
  // Modal Apply Logic
  const handleApplyClick = (workPostId) => {
    setSelectedWorkPostId(workPostId);
    setIsModalOpen(true);
  };

  // Modal Withdraw Logic
  const handleWithdrawClick = (workPostId) => {
    setSelectedWorkPostId(workPostId);
    setIsWithdrawalModalOpen(true);
  };

  // Navigate to Job Details
  const navigateToJobDetails = () => {
    const to = `${location.pathname}/jobs/${currently_applied_work_post.id}`;

    navigate(to);
  };

  // Navigate to Daily Time Record
  const navigateToDtr = () => {
    const to = `${location.pathname}/${application_id}/daily-time-records`;

    navigate(to);
  };

  // Navigate to Application Page
  const navigateToApplication = () => {
    // console.log(`${location.pathname}/application/${application_id}`);
    const to = `${location.pathname}/applications/${application_id}`;

    // apply/:job_id
    navigate(to);
  };

  // Applies into a Job
  const handleConfirmApply = async () => {
    // Set Loading
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  // Withdraws in a Job applied
  const handleConfirmWithdraw = async () => {
    console.log("Confirmed Withdrawal");
  };

  return (
    <>
      <Page className="p-4 overflow-y-auto mx-auto">
        {/* Loading */}
        <Loader loading={loading} />

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
              <Button
                onClick={navigateToDtr}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Manage DTR
              </Button>
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
              {currentWorkPost.map((workPost) => {
                // console.log(workPost);

                return (
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
                      <Link
                        to={`${location.pathname}/jobs/${workPost.id}`}
                        // onClick={() => navigate(`${location}/${workPost.id}`)}
                        className="px-4 py-2 rounded-md font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
                      >
                        View Job
                      </Link>
                    </div>
                  </div>
                );
              })}
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
                    handleWithdrawClick(currently_applied_work_post.id)
                  }
                  disabled={[10, 11, 12].includes(status)}
                  className={`w-full sm:w-auto py-2 px-6 rounded-md text-white font-medium ${
                    [10, 11, 12].includes(status)
                      ? "bg-gray-600"
                      : "bg-red-600 hover:bg-red-700"
                  } transition-all`}
                >
                  Withdraw
                </Button>
                <Button
                  onClick={navigateToApplication}
                  className="w-full sm:w-auto py-2 px-6 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
                >
                  View Application
                </Button>
                <Button
                  onClick={navigateToJobDetails}
                  className="w-full sm:w-auto py-2 px-6 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
                >
                  View Job Details
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {/* Apply Modal  */}
        <ApplyModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleConfirmApply={handleConfirmApply}
        />

        {/* Withdraw Modal  */}
        <WithdrawModal
          isWithdrawModalOpen={isWithdrawModalOpen}
          setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
          handleConfirmWithdraw={handleConfirmWithdraw}
        />
      </Page>
    </>
  );
};

export default StudentHomePage;
