import React, { useEffect, useState } from "react";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import ApplicationHeader from "../components/applications/ApplicationHeader";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getRequest, postFormDataRequest, putRequest } from "../api/apiHelpers";
import DocumentTable from "../components/applications/DocumentTable";
import Text from "../components/common/Text";
import { Button } from "@headlessui/react";
import FormModal from "../components/modals/FormModal";
import UploadFile from "../components/common/UploadFile.";

const ManageApplicantPage = ({ authorizeRole }) => {
  // Location and Navigate
  const location = useLocation();
  const navigate = useNavigate();

  // Parameter
  const { application_id } = useParams();

  // Backend Resource
  const resource = `/api/v1/applicants/${application_id}?requestedBy=${authorizeRole}`;

  // Loading State
  const [loading, setLoading] = useState(false);
  // Container state
  const [applicant, setApplicant] = useState({});
  const [applicationStatusID, setApplicationStatusID] = useState(0);
  // Modal State
  const [isOpenImport, setIsOpenImport] = useState(false);
  // Status State
  const [status, setStatus] = useState(false);
  // Input State
  const [file, setFile] = useState(null);

  // Fetch Applicant
  const fetchApplicant = async () => {
    // Set Loading State
    setLoading(true);

    try {
      const response = await getRequest({
        url: resource,
      });

      if (response) {
        console.log(response);
        setApplicant(response);
        setApplicationStatusID(response.status_id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicant();
  }, []);

  /**
   * Handle File Upload
   */
  const handleOpenModal = (selectedIds) => {
    setIsOpenImport(true);
  };

  /**
   * Handle File Change
   */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setStatus(""); // Reset status on file selection
  };

  // Submit File
  const submitFile = async (event) => {
    // Set Loading
    setLoading(true);

    event.preventDefault();
    if (!file) {
      setStatus("error");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
      // POST FORM DATA
      const response = await postFormDataRequest({
        url: `/api/v1/applications/${application_id}/submit-acceptance-letter`,
        data: formData,
      });

      if (response) {
        setIsOpenImport(false);
        // navigate(-1);
        setStatus("Endorsement Letter Uploaded Successfully!");
      }
    } catch (error) {
      // console.log(error.response.data.errors);
      setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
    } finally {
      setLoading(false);
    }
  };

  // Handle Reject
  const handleReject = async (application_id) => {
    setLoading(true);

    // Reject Instantly
    try {
      // READY PUT METHOD
      const response = await putRequest({
        url: `api/v1/applications/${application_id}/mark-as-rejected`,
      });

      if (response) {
        navigate(location.pathname, { replace: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Approve
  const handleApprove = async (application_id) => {
    setLoading(true);

    // Approve Instantly
    try {
      // READY PUT METHOD
      const response = await putRequest({
        url: `api/v1/applications/${application_id}/mark-as-approve`,
      });

      if (response) {
        // console.log(response);
        navigate(location.pathname, { replace: true });
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />

      <div className="container mx-auto p-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-400">
          <dl className="divide-y divide-gray-400">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {applicant.name}
              </dd>
            </div>

            {authorizeRole === "coordinator" && (
              <>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">
                    Company
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {applicant.company}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">
                    Office
                  </dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {applicant.office}
                  </dd>
                </div>
              </>
            )}

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Application for
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {applicant.job_title}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {applicant.email}
              </dd>
            </div>
          </dl>
        </div>
        {applicant.documents && applicant.documents.length > 0 && (
          <DocumentTable
            applicationID={application_id}
            authorizeRole={authorizeRole}
            applicationStatusID={applicationStatusID}
          />
        )}
        {/* Action Section */}
        {/* Check if the application status is not 5 (Withdrawn) */}
        {applicant.status_id !== 5 &&
          /* Allow actions if the application status is 1 (Pending) */
          // ! FOR COMPANY ONLY
          applicant.status_id === 1 && (
            <div className="flex justify-center mt-8 space-x-4">
              {/* Upload Button */}
              {!(
                authorizeRole === "osa" || authorizeRole === "coordinator"
              ) && (
                <Button
                  onClick={handleOpenModal}
                  className="bg-blue-500 text-white py-2 px-6 rounded border border-blue-600 text-lg font-semibold hover:bg-blue-600 hover:border-blue-700 transition-all"
                >
                  Upload Acceptance Letter
                </Button>
              )}

              {/* Generate Acceptance Letter Button */}
              {!(
                authorizeRole === "osa" || authorizeRole === "coordinator"
              ) && (
                <Link
                  to={`${location.pathname}/generate-acceptance`}
                  state={{
                    application: applicant,
                  }}
                  className="bg-blue-500 text-white py-2 px-6 rounded border border-blue-600 text-lg font-semibold hover:bg-blue-600 hover:border-blue-700 transition-all"
                >
                  Generate Acceptance Letter
                </Link>
              )}

              {/* Approve Button */}
              {!(
                authorizeRole === "osa" || authorizeRole === "coordinator"
              ) && (
                <Button
                  onClick={() => handleApprove(applicant.id)}
                  className={`bg-blue-500 text-white border border-blue-600 hover:bg-blue-600 hover:border-blue-700 py-2 px-6 rounded text-lg font-semibold transition-all`}
                >
                  Approve
                </Button>
              )}

              {/* Reject Button */}
              {!(
                authorizeRole === "osa" || authorizeRole === "coordinator"
              ) && (
                <Button
                  onClick={() => handleReject(applicant.id)}
                  className={`bg-red-500 text-white border border-red-600 hover:bg-red-600 hover:border-red-700 py-2 px-6 rounded text-lg font-semibold transition-all`}
                >
                  Reject
                </Button>
              )}
            </div>
          )}
      </div>

      {/* Modal for File Upload */}
      <FormModal
        isOpen={isOpenImport}
        setIsOpen={setIsOpenImport}
        modalTitle="Upload Acceptance Letter"
        onSubmit={submitFile}
      >
        <UploadFile
          title="Upload Acceptance Letter"
          file={file}
          set={setFile}
          handleFileChange={handleFileChange}
        />
      </FormModal>
    </Page>
  );
};

export default ManageApplicantPage;
