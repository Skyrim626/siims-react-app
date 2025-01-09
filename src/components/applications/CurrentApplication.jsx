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

  const isWithdrawDisabled = application.application_status_id !== 1;

  return (
    <div className="lg:w-3/4 w-full mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Current Application
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {application.title}
            </h3>
            <p className="text-gray-500 mt-1">{application.company}</p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
            <img
              src={getProfileImage(application.profile_url)}
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="border-t border-b border-gray-200 py-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Office</span>
            <span className="text-gray-900 font-medium">
              {application.office}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Duration</span>
            <span className="text-gray-900 font-medium">
              {application.work_duration}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Applied Date</span>
            <span className="text-gray-900 font-medium">
              {application.applied_date}
            </span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            onClick={navigateToJobDetails}
            className="flex-1 lg:flex-none bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            View Job Details
          </Button>
          <Button
            onClick={navigateToApplication}
            className="flex-1 lg:flex-none bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
          >
            View Application
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className={`${
              isWithdrawDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } flex-1 lg:flex-none text-white py-2 px-4 rounded-md transition`}
            disabled={isWithdrawDisabled}
          >
            Withdraw
          </Button>
        </div>
      </div>

      <DeleteConfirmModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="Withdraw Application"
        message="Are you sure you want to withdraw this application?"
        handleDelete={handleWithdrawClick}
      />
    </div>
  );
};

export default CurrentApplication;
