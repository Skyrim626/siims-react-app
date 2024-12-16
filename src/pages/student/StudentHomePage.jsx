import React, { useState, useEffect } from "react";
import JobPost from "../../components/workPosts/JobPost";
import { Button, Input } from "@headlessui/react";
import useSearch from "../../hooks/test/useSearch";
import useFetch from "../../hooks/useFetch";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../../api/apiHelpers";
import ApplyModal from "../../components/workPosts/ApplyModal";
import WithdrawModal from "../../components/workPosts/WithdrawModal";
import JobListsSection from "../../components/workPosts/JobListsSection";
import CurrentlyJobApplied from "../../components/workPosts/CurrentlyJobApplied";
import ReportsSection from "../../components/workPosts/ReportsSection";

const StudentHomePage = () => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Location and Navigate
  const location = useLocation();
  const navigate = useNavigate();

  // Container State
  const [jobPosts, setJobPosts] = useState([]);
  const [currentlyAppliedWorkPost, setCurrentlyAppliedWorkPost] =
    useState(null);

  // Fetch State
  const [studentStatus, setStudentStatus] = useState(null);
  const [student, setStudent] = useState();

  // Apply Status
  const [canApply, setCanApply] = useState(null); // will hold the application status
  const [errors, setErrors] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [selectedWorkPostId, setSelectedWorkPostId] = useState(null);

  const [activeTab, setActiveTab] = useState("All Jobs");
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Search Hooks
  const { searchTerm, triggerSearch, handleSearchChange, handleKeyDown } =
    useSearch();

  // Fetch document types with search and pagination
  const {
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    handleNextPage,
    handlePrevPage,
  } = useFetch({
    url: "/users/students/home-fetch-jobs", // URL for document types
    initialPage: 1,
    initialItemsPerPage: 5,
    searchTerm: triggerSearch ? searchTerm : "", // Only pass search term when search is triggered
    setData: setJobPosts,
    setLoading: setLoading,
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      try {
        const response = await getRequest({
          url: "/api/v1/users/students/home",
        });

        if (response) {
          setStudentStatus(response.studentStatus || null);
          // console.log(response.studentStatus);
          setStudent(response.student);

          setCurrentlyAppliedWorkPost(response.currently_applied_work_post);
        }

        const responseApplyStatus = await getRequest({
          url: `/api/v1/users/students/${response.student.id}/check-apply-status`,
        });

        if (responseApplyStatus.can_apply) {
          setCanApply(true);
        } else {
          setCanApply(false);
          setErrors(responseApplyStatus.data.message); // Display the blocking message
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Tab Change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Skill Filter Change
  const handleSkillFilterChange = (event) => {
    setSelectedSkills(event.target.value);
  };

  // Modal Logic
  // Modal Apply Logic
  const handleApplyClick = (workPostId) => {
    setSelectedWorkPostId(workPostId);
    setIsModalOpen(true);
  };

  // Navigate to Job Details
  const navigateToJobDetails = () => {
    const to = `${location.pathname}/jobs/${currentlyAppliedWorkPost.work_post.id}`;

    navigate(to);
  };

  // Modal Withdraw Logic
  const handleWithdrawClick = (workPostId) => {
    setSelectedWorkPostId(workPostId);
    setIsWithdrawalModalOpen(true);
  };

  // Navigate to Daily Time Record
  const navigateToDtr = () => {
    const to = `${location.pathname}/${currentlyAppliedWorkPost.id}/daily-time-records`;

    navigate(to);
  };

  // Navigate to Weekly Accomplishment Reports
  const navigateToWeekly = () => {
    const to = `${location.pathname}/${currentlyAppliedWorkPost.id}/weekly-accomplishment-reports`;

    navigate(to);
  };

  // Navigate to Application Page
  const navigateToApplication = () => {
    // console.log(`${location.pathname}/application/${application_id}`);
    const to = `${location.pathname}/applications/${currentlyAppliedWorkPost.id}`;

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
          `${location.pathname}/applications/${response.application_id}`,
          {
            replace: true,
          }
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
        url: `/api/v1/applications/${currentlyAppliedWorkPost.id}/withdraw`,
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
    <div>
      <Loader loading={loading} />

      <div className="min-h-screen overflow-y-auto">
        <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
          {/* Profile Sidebar (Fixed Left) */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
              {/* Profile Header */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20">
                  <img
                    src="/images/EC25KRDBo-K3w8GexNHSE.png"
                    alt="Profile"
                    className="w-full h-full rounded-full border-4 border-indigo-600 object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    John Doe
                  </h3>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800">
                  Contact Information
                </h4>
                <ul className="mt-4 text-sm text-gray-600 space-y-3">
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-600">✉️</span>
                    <a
                      href="mailto:johndoe@example.com"
                      className="text-blue-600 hover:underline"
                    >
                      johndoe@example.com
                    </a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-600">📞</span>
                    <a
                      href="tel:123-456-7890"
                      className="text-blue-600 hover:underline"
                    >
                      123-456-7890
                    </a>
                  </li>
                </ul>
              </div>

              {/* Work Experience */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800">
                  Work Experience
                </h4>
                <ul className="mt-4 text-sm text-gray-600 space-y-3">
                  <li>
                    <strong className="text-gray-900">Frontend Engineer</strong>{" "}
                    - Invision
                    <p className="text-xs text-gray-500">Jan 2020 - Present</p>
                  </li>
                  <li>
                    <strong className="text-gray-900">Junior Developer</strong>{" "}
                    - Tech Solutions
                    <p className="text-xs text-gray-500">Jul 2018 - Dec 2019</p>
                  </li>
                </ul>
              </div>

              {/* Education */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800">
                  Education
                </h4>
                <ul className="mt-4 text-sm text-gray-600 space-y-3">
                  <li>
                    <strong className="text-gray-900">
                      Bachelor of Science in Information Technology
                    </strong>
                    <p className="text-xs text-gray-500">
                      XYZ University - 2018
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          {/* Deployed - 12 */}
          {studentStatus === 12 && (
            <ReportsSection
              navigateToDtr={navigateToDtr}
              navigateToWeekly={navigateToWeekly}
            />
          )}

          {/* If the student already applied, display this */}

          {currentlyAppliedWorkPost &&
            currentlyAppliedWorkPost.student.status_id !== 6 &&
            currentlyAppliedWorkPost.student.status_id !== 12 && (
              <CurrentlyJobApplied
                currently_applied_work_post={currentlyAppliedWorkPost.work_post}
                handleWithdrawClick={handleWithdrawClick}
                navigateToApplication={navigateToApplication}
                status={currentlyAppliedWorkPost.student.status_id}
                navigateToJobDetails={navigateToJobDetails}
              />
            )}

          {/* Job Listings and Filters (Scrollable Middle) */}
          {studentStatus &&
            studentStatus === 8 &&
            (student.student.coordinator_id ? (
              <JobListsSection
                jobPosts={jobPosts}
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                handleApplyClick={handleApplyClick}
                canApply={canApply}
              />
            ) : (
              <>
                <EmptyState
                  title="No jobs available at the moment. You don't have a coordinator just yet."
                  message="Once activities are recorded, jobs will appear here if you have a coordinator."
                />
              </>
            ))}

          {/* Skills Filter Sidebar (Fixed Right) */}
          <div className="lg:w-1/4 w-full hidden">
            <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 p-8 rounded-xl shadow-lg border border-indigo-200">
              {/* Sidebar Title */}
              <h4 className="text-2xl font-semibold text-indigo-800 mb-8 tracking-wide">
                Filter by Skill
              </h4>

              {/* Skill Filter Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-center space-x-3 text-gray-700">
                  <Input
                    type="checkbox"
                    value="JavaScript"
                    onChange={handleSkillFilterChange}
                    checked={selectedSkills.includes("JavaScript")}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="text-sm">JavaScript</span>
                </label>

                <label className="flex items-center space-x-3 text-gray-700">
                  <Input
                    type="checkbox"
                    value="React"
                    onChange={handleSkillFilterChange}
                    checked={selectedSkills.includes("React")}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="text-sm">React</span>
                </label>

                <label className="flex items-center space-x-3 text-gray-700">
                  <Input
                    type="checkbox"
                    value="CSS"
                    onChange={handleSkillFilterChange}
                    checked={selectedSkills.includes("CSS")}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="text-sm">CSS</span>
                </label>

                <label className="flex items-center space-x-3 text-gray-700">
                  <Input
                    type="checkbox"
                    value="Node.js"
                    onChange={handleSkillFilterChange}
                    checked={selectedSkills.includes("Node.js")}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="text-sm">Node.js</span>
                </label>

                <label className="flex items-center space-x-3 text-gray-700">
                  <Input
                    type="checkbox"
                    value="Git"
                    onChange={handleSkillFilterChange}
                    checked={selectedSkills.includes("Git")}
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="text-sm">Git</span>
                </label>
              </div>

              {/* Filter Description */}
              <p className="text-sm text-gray-600 mt-5 leading-relaxed">
                Select one or more skills to filter candidates based on their
                expertise.
              </p>

              {/* Reset Button */}
              <Button
                onClick={() =>
                  handleSkillFilterChange({ target: { value: [] } })
                }
                className="mt-6 w-full py-3 px-5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              >
                Clear Filter
              </Button>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default StudentHomePage;
