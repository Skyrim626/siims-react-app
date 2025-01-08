import React, { useEffect, useState } from "react";
import { getRequest, putRequest } from "../../api/apiHelpers";
import { Button } from "@headlessui/react";
import { getProfileImage } from "../../utils/imageHelpers";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";

const CurrentApplication = () => {
  // Open location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch the latest application
  const fetchLatestApplication = async () => {
    try {
      const response = await getRequest({
        url: "/api/v1/applications/latest",
      });

      if (response) {
        // console.log(response);
        setApplication(response);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestApplication();
  }, []);

  const handleWithdrawClick = async () => {
    // onsole.log("Withdraw button clicked");
    // Add withdrawal logic here

    // Set Loading State
    setLoading(true);

    try {
      const response = await putRequest({
        url: `/api/v1/applications/${application.id}/withdraw`,
      });

      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  // Navigate to Application Page
  const navigateToApplication = () => {
    const to = `${location.pathname}/applications/${application.id}`;

    navigate(to);
  };

  const navigateToJobDetails = () => {
    const to = `${location.pathname}/jobs/${application.work_post_id}`;

    navigate(to);
  };

  if (loading) {
    return (
      <div className="lg:w-3/4 w-full text-center py-6">
        <p className="text-gray-500">Fetching your application details...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="lg:w-3/4 w-full text-center py-6">
        <p className="text-gray-500">No current application found.</p>
      </div>
    );
  }

  return (
    <div className="lg:w-3/4 w-full mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
        Your Current Application
      </h2>
      <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Job Details */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {application.title}
            </h3>
            <p className="text-gray-700 mb-2">
              <strong>Company:</strong> {application.company}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Office:</strong> {application.office}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Duration:</strong> {application.work_duration}
            </p>
            <p className="text-gray-700">
              <strong>Applied Date:</strong> {application.applied_date}
            </p>
          </div>

          {/* Profile Placeholder */}
          <div className="w-full lg:w-1/4 flex justify-center lg:justify-end">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={getProfileImage(application.profile_url)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            onClick={navigateToJobDetails}
            className="flex-1 lg:flex-none bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            View Job Details
          </Button>
          <Button
            onClick={navigateToApplication}
            className="flex-1 lg:flex-none bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            View Applications
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className={`${
              application.application_status_id !== 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } flex-1 lg:flex-none  text-white px-5 py-2 rounded-lg shadow-md  transition-all duration-200`}
            disabled={application.application_status_id !== 1}
          >
            Withdraw
          </Button>
        </div>
      </div>

      <DeleteConfirmModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Withdraw Application"
        message=" Are you sure you want to withdraw from this application?"
        handleDelete={handleWithdrawClick}
      />
    </div>
  );
};

export default CurrentApplication;
