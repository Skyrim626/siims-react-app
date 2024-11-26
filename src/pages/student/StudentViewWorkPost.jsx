import React, { useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  MapPin,
  Users,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { postRequest } from "../../api/apiHelpers";
import { stripLocation } from "../../utils/strip";
import Loader from "../../components/common/Loader";

const StudentViewWorkPost = () => {
  const { workPost, status } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Modal Toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle Application Logic
  const handleApply = async () => {
    // Set Loading State
    setLoading(true);

    // Method POST
    // Create a new application record
    try {
      const response = await postRequest({
        url: `/api/v1/student/jobs/${workPost.id}/apply`,
      });

      toggleModal(); // Close Modal

      if (response) {
        navigate("/auth/my", {
          replace: true,
        });
        /* navigate(
          `${stripLocation(location.pathname, workPost.id)}/applications/${
            response.application_id
          }`,
          { replace: true }
        ); */
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
      toggleModal();
    }

    // console.log("Application submitted for", workPost.id);
    // Add further logic for applying, such as sending API request
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Loader loading={loading} />

      {/* Go Back Button */}
      <div className="max-w-4xl mx-auto px-6 mb-4">
        <button
          onClick={() => navigate("/auth/my")} // Navigate to the previous page
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-10">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold">{workPost.title}</h1>
          <p className="mt-2 text-lg">{workPost.company}</p>
          <p className="mt-1 text-sm uppercase tracking-wide">
            {workPost.work_post_type}
          </p>
          <div
            className={`mt-4 inline-block px-4 py-2 text-sm rounded-lg font-semibold ${
              workPost.is_closed ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {workPost.is_closed ? "Closed" : "Open"}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-8 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase className="text-blue-500 w-5 h-5" />
            Responsibilities
          </h2>
          <p className="mt-2 text-gray-600">{workPost.responsibilities}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Users className="text-green-500 w-5 h-5" />
            Qualifications
          </h2>
          <p className="mt-2 text-gray-600">{workPost.qualifications}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="text-indigo-500 w-4 h-4" />
              Duration
            </h3>
            <p className="text-lg font-medium text-gray-800">
              {workPost.work_duration}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm text-gray-600 flex items-center gap-2">
              <Users className="text-yellow-500 w-4 h-4" />
              Max Applicants
            </h3>
            <p className="text-lg font-medium text-gray-800">
              {workPost.max_applicants}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="text-blue-500 w-4 h-4" />
              Start Date
            </h3>
            <p className="text-lg font-medium text-gray-800">
              {workPost.start_date}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="text-red-500 w-4 h-4" />
              End Date
            </h3>
            <p className="text-lg font-medium text-gray-800">
              {workPost.end_date}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="text-purple-500 w-5 h-5" />
            Office
          </h2>
          <p className="mt-2 text-gray-600">{workPost.office}</p>
        </div>
      </div>
      {/* Call-to-Action */}
      <div className="max-w-4xl mx-auto mt-6 flex justify-center">
        {!workPost.is_closed && (
          <button
            className={`bg-gradient-to-r ${
              status !== 8
                ? "from-gray-600 to-gray-500"
                : "from-blue-600 to-indigo-500 hover:scale-105 transition-transform"
            }  text-white font-bold py-3 px-6 rounded-lg shadow-lg`}
            onClick={toggleModal}
            disabled={status !== 8}
          >
            Apply Now
          </button>
        )}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Apply for {workPost.title}
              </h3>
              <button onClick={toggleModal}>
                <XCircle className="text-gray-500 w-6 h-6 hover:text-gray-800" />
              </button>
            </div>
            <p className="mt-4 text-gray-600">
              Are you sure you want to apply for this position? Click "Confirm"
              to proceed.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                onClick={handleApply}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentViewWorkPost;
