import React, { useEffect, useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import EmptyState from "../common/EmptyState";
import Loader from "../common/Loader";
import JobPost from "./JobPost";
import { getRequest, postRequest } from "../../api/apiHelpers";
import Pagination from "@mui/material/Pagination";
import ApplyModal from "./ApplyModal";
import { useNavigate, useLocation } from "react-router-dom";

// Tabs configuration
const tabs = [
  { name: "All Jobs", url: "/api/v1/work-posts/for-student/all-jobs" },
  {
    name: "Internship",
    url: "/api/v1/work-posts/for-student/all-jobs",
    workTypeId: 1,
  },
  {
    name: "Immersion",
    url: "/api/v1/work-posts/for-student/all-jobs",
    workTypeId: 2,
  },
];

const TestJobListsSection = () => {
  // Open location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobPosts, setJobPosts] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [paginationMeta, setPaginationMeta] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const perPage = 5;
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkPostId, setSelectedWorkPostId] = useState(null);
  // Error State
  const [errors, setErrors] = useState({});

  // Function that gets the job postings
  const fetchJobPosts = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        search: searchQuery,
        perPage,
        work_type_id: activeTab.workTypeId || null,
      };
      const response = await getRequest({ url: activeTab.url, params });
      if (response) {
        setJobPosts(response.data);
        setPaginationMeta({
          currentPage: response.meta.current_page,
          totalPages: response.meta.last_page,
        });
      }
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPosts(1); // Fetch data when active tab changes
  }, [activeTab]);

  const handlePageChange = (event, page) => {
    fetchJobPosts(page);
  };

  /**
   * Modal Logic
   * Modal Apply Logic
   * Function that allows the user to apply
   */
  const handleApplyClick = (workPostId) => {
    setSelectedWorkPostId(workPostId);
    setIsModalOpen(true);
  };

  // Function that Applies into a Job
  const handleConfirmApply = async () => {
    // Set Loading
    setLoading(true);

    // Method POST
    // Create a new application record
    try {
      /* const response = await postRequest({
          url: `/api/v1/student/jobs/${selectedWorkPostId}/apply`,
        }); */
      /* const response = await postRequest({
        url: `/api/v1/applications/${selectedWorkPostId}/apply`,
      }); */

      const response = await postRequest({
        url: `/api/v1/applications/${selectedWorkPostId}`,
      });

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

  return (
    <div className="lg:w-3/4 w-full">
      {loading && <Loader loading={loading} />}

      <TabGroup
        as="div"
        className="border-b border-gray-300 pb-2"
        onChange={(index) => setActiveTab(tabs[index])}
      >
        <TabList className="flex space-x-4">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `text-lg font-semibold ${
                  selected ? "text-blue-600" : "text-gray-600"
                }`
              }
            >
              {tab.name}
            </Tab>
          ))}
        </TabList>
      </TabGroup>

      <div className="mt-8 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search job listings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchJobPosts(1)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mt-6 space-y-8">
        {jobPosts.length > 0 ? (
          jobPosts.map((post) => (
            <JobPost
              key={post.id}
              job={post}
              handleApplyClick={handleApplyClick}
              canApply={true}
            />
          ))
        ) : (
          <EmptyState
            title="No jobs found"
            message={
              searchQuery
                ? `No jobs match your search for "${searchQuery}". Try adjusting your search.`
                : "Jobs will appear here once available."
            }
          />
        )}
      </div>

      {paginationMeta.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            count={paginationMeta.totalPages}
            page={paginationMeta.currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}

      {/* Modal */}
      {/* Apply Modal  */}
      <ApplyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleConfirmApply={handleConfirmApply}
      />
    </div>
  );
};

export default TestJobListsSection;
