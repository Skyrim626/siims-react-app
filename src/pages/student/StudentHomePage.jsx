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

const StudentHomePage = () => {
  // Fetch initial_workPost_posts
  const workPosts = useLoaderData();
  // console.log(workPosts);

  // Location and Navigate
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch State
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

  const handleConfirmApply = async () => {
    // Method POST
    // Create a new application record
    try {
      const response = await postRequest({
        url: `/api/v1/student/jobs/${selectedWorkPostId}/apply`,
      });

      setIsModalOpen(false);
      navigate(`${location.pathname}/apply/${selectedWorkPostId}`);
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

        {/* WorkPost List Section */}
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Available Internships</h2>
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
