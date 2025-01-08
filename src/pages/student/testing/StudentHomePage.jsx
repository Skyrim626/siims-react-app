import { useEffect, useState } from "react";
import Page from "../../../components/common/Page";
import {
  Link,
  NavLink,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getRequest, postRequest, putRequest } from "../../../api/apiHelpers";
import Text from "../../../components/common/Text";
import Loader from "../../../components/common/Loader";
import ApplyModal from "../../../components/workPosts/ApplyModal";
import WithdrawModal from "../../../components/workPosts/WithdrawModal";
import PostBox from "../../../components/workPosts/PostBox";
import ReportsSection from "../../../components/workPosts/ReportsSection";
import WorkPost from "../../../components/workPosts/WorkPost";
import Pagination from "../../../components/workPosts/Pagination";
import CurrentlyJobApplied from "../../../components/workPosts/CurrentlyJobApplied";
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
    application_status,
  } = useLoaderData();
  // console.log(currently_applied_work_post);
  // console.log(student);
  // console.log(status);
  // console.log(workPosts);

  // Apply Status
  const [canApply, setCanApply] = useState(null); // will hold the application status
  const [errors, setErrors] = useState("");

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

  // State for Active Tab
  const [activeTab, setActiveTab] = useState("All");

  // Filtered Work Posts based on the selected tab
  const filteredWorkPosts = workPosts.filter((workPost) => {
    if (activeTab === "All") return true;
    return workPost.work_post_type === activeTab;
  });

  // Calculate the total number of pages
  // Calculate total pages for filtered work posts
  const totalPages = Math.ceil(filteredWorkPosts.length / workPostsPerPage);
  const indexOfLastWorkPost = currentPage * workPostsPerPage;
  const indexOfFirstWorkPost = indexOfLastWorkPost - workPostsPerPage;
  const currentWorkPost = filteredWorkPosts.slice(
    indexOfFirstWorkPost,
    indexOfLastWorkPost
  );

  useEffect(() => {
    // Call the backend API to check if the student can apply
    const checkStudentStatus = async () => {
      try {
        // const response = await axios.get(`/api/students/${studentId}/check-apply-status`);
        const response = await getRequest({
          url: `/api/v1/users/students/${student.id}/check-apply-status`,
        });

        if (response.can_apply) {
          setCanApply(true);
        } else {
          setCanApply(false);
          setErrors(response.data.message); // Display the blocking message
        }
      } catch (error) {
        console.error("Error checking student status:", error);
        setCanApply(false);
        setErrors("An error occurred while checking application status.");
      }
    };

    checkStudentStatus();
  }, [student.id]);

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

  // Navigate to Weekly Accomplishment Reports
  const navigateToWeekly = () => {
    const to = `${location.pathname}/${application_id}/my-weekly-reports`;

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
      /* const response = await postRequest({
        url: `/api/v1/student/jobs/${selectedWorkPostId}/apply`,
      }); */
      const response = await postRequest({
        url: `/api/v1/applications/${selectedWorkPostId}/apply`,
      });

      // console.log(response);

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
    setLoading(true);

    try {
      const response = await putRequest({
        url: `/api/v1/applications/${application_id}/withdraw`,
      });

      if (response) {
        setIsWithdrawalModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Page className="p-4 overflow-y-auto mx-auto">
        {/* Loading */}
        <Loader loading={loading} />

        {/* New Post Box */}
        <PostBox />

        {/* Tabs */}
        {studentStatus == 8 && (
          <div className="mb-6">
            <button
              onClick={() => setActiveTab("All")}
              className={`mr-4 px-6 py-3 rounded-md font-medium ${
                activeTab === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("Internship")}
              className={`mr-4 px-6 py-3 rounded-md font-medium ${
                activeTab === "Internship"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Internship
            </button>
            <button
              onClick={() => setActiveTab("Immersion")}
              className={`mr-4 px-6 py-3 rounded-md font-medium ${
                activeTab === "Immersion"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Immersion
            </button>
          </div>
        )}

        {/* Reports Section */}
        {/* Deployed - 12 */}
        {studentStatus === 12 && (
          <ReportsSection
            navigateToDtr={navigateToDtr}
            navigateToWeekly={navigateToWeekly}
          />
        )}
        {/* WorkPost List Section */}
        {/* Not yet applied - 10 */}
        {studentStatus === 8 && (
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              {activeTab === "All"
                ? "Available Work Posts"
                : `${activeTab} Opportunities`}
            </h2>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {currentWorkPost.map((workPost) => (
                <WorkPost
                  key={workPost.id}
                  workPost={workPost}
                  handleApplyClick={() => handleApplyClick(workPost.id)}
                  location={location}
                  canApply={canApply}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>
        )}

        {/* If the student already applied, display this */}
        {currently_applied_work_post && application_status !== 6 && (
          <CurrentlyJobApplied
            currently_applied_work_post={currently_applied_work_post}
            handleWithdrawClick={handleWithdrawClick}
            navigateToApplication={navigateToApplication}
            status={status}
            navigateToJobDetails={navigateToJobDetails}
          />
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
