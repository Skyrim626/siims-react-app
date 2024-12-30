import { useEffect, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Page from "../../components/common/Page";
import { Button, Input } from "@headlessui/react";
import {
  getRequest,
  postFormDataRequest,
  postRequest,
} from "../../api/apiHelpers";
import Text from "../../components/common/Text";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StudentFileUploader from "../../components/users/student/StudentFileUploader";
import FormModal from "../../components/modals/FormModal";
import EndorsementRequestForm from "../../components/forms/EndorsementRequestForm";
import { getStatusColor, getStatusBgColor } from "../../utils/statusColor";
import toFilePath from "../../utils/baseURL";
import Loader from "../../components/common/Loader";

const StudentJobApplicationPage = () => {
  // Fetch loader data
  const {
    initial_application,
    initial_step_one_documents,
    stepTwoDocuments,
    job,
    status,
  } = useLoaderData();
  // console.log(stepOneDocuments);
  // console.log(status);

  // Container State
  const [stepOneDocuments, setStepOneDocuments] = useState(
    initial_step_one_documents
  );

  // console.log(stepOneDocuments);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Button State
  const [isClickedButtonRequest, setIsClickedButtonRequest] = useState(false);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Open navigate and location
  const navigate = useNavigate();
  const location = useLocation();

  // Error State
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState({
    coverLetter: null,
    resume: null,
  });

  /**
   * Endorsement Request Form
   *
   */
  const [description, setDescription] = useState("");
  const [studentIds, setStudentIds] = useState("");

  // Open Modal Endorsement Form
  const openEndorsementForm = () => {
    setIsOpen(true);
  };

  // Submit Endorsement Form
  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    // Loading State
    setLoading(true);

    try {
      // Convert student IDs into the desired format [{ "student_id": "12345" }]
      const studentIdsArray = studentIds.split(",").map((id) => ({
        student_id: id.trim(),
      }));

      // Filter out empty student_id values
      const filteredStudentIds = studentIdsArray.filter(
        (item) => item.student_id !== ""
      );

      // Prepare the payload with multiple student IDs
      const payload = {
        application_id: initial_application.id,
        // work_post_id: initial_application.work_post_id, // Dynamic data
        requested_by_id: initial_application.student_id, // Dynamic user ID
        description: description,
        student_ids: filteredStudentIds, // Process comma-separated student IDs
      };

      // Make POST request
      const response = await postRequest({
        url: `/api/v1/endorsement-letter-requests`,
        data: payload,
      });

      // console.log("Response:", response);

      // Optionally, close modal and provide feedback

      // Navigate to another page or show success message

      if (response) {
        setIsClickedButtonRequest(true);
        navigate(location.pathname, { replace: true });
        setIsOpen(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // console.log(error.response.data.errors);
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

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle student ID input change
  const handleStudentIdsChange = (e) => {
    setStudentIds(e.target.value);
  };

  /**
   *
   *
   *
   *
   *
   */

  // Submit Document
  const handleFileUpload = async (e, fileType) => {
    // Loading State
    setLoading(true);

    const file = e.target.files[0];
    if (file) {
      // console.log(file);

      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [fileType]: file,
      }));

      // Simulate API call to send the file to the backend
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", file);

      try {
        // console.log("Uploading file to the backend...");

        const response = await postFormDataRequest({
          url: `/api/v1/student/applications/${initial_application.id}/upload-document/${fileType}`, // ID of that document
          data: formData,
        });

        // Navigate after submitting
        if (response) {
          // console.log();
          // setStepOneDocuments((prev) => [...prev, ...response.data]);
          setStepOneDocuments((prevData) =>
            prevData.map((data) =>
              data.id === fileType ? { ...data, ...response.data } : data
            )
          );
          // navigate(location.pathname);
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReturn = () => {
    // Simulate the application submission process
    // setIsSubmitted(true); // Set the submission state to true
    // Optionally, log success or show confirmation message in the console
    /* console.log(
      "Application submitted successfully. Please wait for approval."
    ); */
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4)); // Only 4 steps now
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Progress Indicator Data (now 4 steps)
  const steps = [
    "Application Requirements",
    "Complete Requirements",
    // "Requirements",
    // "Summary",
    "Approved",
  ];

  return (
    <Page>
      <Loader loading={loading} />

      {/* Open - Endorsement Form Component */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Request Endorsement"
        onSubmit={handleSubmitRequest}
        minWidth="min-w-[500px]"
      >
        <EndorsementRequestForm
          description={description}
          setDescription={setDescription}
          studentIds={studentIds}
          setStudentIds={setStudentIds}
          handleDescriptionChange={handleDescriptionChange}
          handleStudentIdsChange={handleStudentIdsChange}
          errors={errors}
        />
      </FormModal>
      {/* Close - Endorsement Form Component */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Apply for {job.title}
        </h1>
        <div className="mb-6">
          {/* Progress Indicator Wrapper */}
          <div className="relative w-full flex items-center">
            {/* Progress Line */}
            <div className="absolute w-full top-6 h-1 bg-gray-300">
              <div
                className="bg-blue-600 h-1"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>

            {/* Render Each Step */}
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center z-10 w-1/4"
              >
                {/* Step Circle with Checkmark if Done */}
                <div
                  className={`h-12 w-12 flex items-center justify-center rounded-full text-white font-bold ${
                    currentStep >= index + 1 ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  {currentStep > index + 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {/* Step Title */}
                <span
                  className={`mt-2 text-center text-sm font-medium ${
                    currentStep >= index + 1 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-Based Content */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-gray-50">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Upload Required Documents
              </h2>
              <p className="text-gray-600">
                Please upload the following documents to proceed with your
                application. All documents must be marked as
                <span className="font-medium text-green-600"> Approve</span> to
                move to the next step.
              </p>

              {/* Document List */}
              <div className="space-y-4">
                {stepOneDocuments.map((doc) => {
                  if (doc) {
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
                      >
                        {/* Document Name */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {doc.name}
                          </h3>
                          {/* Dynamically render status color */}
                          <div
                            className={`text-sm flex gap-1 items-center ${getStatusColor(
                              doc.status
                            )}`}
                          >
                            <Text>Status:</Text>
                            <Text
                              className={`${getStatusBgColor(
                                doc.status
                              )} p-1 rounded-full`}
                            >
                              {doc.status}
                            </Text>
                          </div>
                        </div>

                        {/* Upload or View */}
                        <div className="flex items-center space-x-4">
                          {doc.file_path ? (
                            <>
                              <a
                                href={toFilePath(doc.file_path)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                              >
                                View File
                              </a>
                              {doc.can_change && (
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                      handleFileUpload(e, doc.id)
                                    }
                                    className="hidden"
                                  />
                                  <span className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
                                    Change File
                                  </span>
                                </label>
                              )}
                            </>
                          ) : (
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => handleFileUpload(e, doc.id)}
                              className="file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-500 file:text-white file:cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              {/* Request Endorsement Button */}
              <div className="flex justify-start mt-4">
                <Button
                  onClick={openEndorsementForm}
                  className={`px-6 py-2 rounded-lg text-white font-medium ${
                    initial_application.endorsement ||
                    [10, 11, 12].includes(status) ||
                    isClickedButtonRequest
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                  disabled={
                    initial_application.endorsement ||
                    [10, 11, 12].includes(status) ||
                    isClickedButtonRequest
                  }
                >
                  Request Endorsement
                </Button>
              </div>

              {initial_application.endorsement && (
                <div className="flex flex-col">
                  {initial_application.endorsement.endorsement_file ? (
                    initial_application.endorsement.status_id === 2 ? (
                      <a
                        href={`${toFilePath(
                          initial_application.endorsement.endorsement_file
                        )}`}
                        target="_blank"
                        className="underline text-blue-500 hover:text-blue-600"
                      >
                        Your endorsement file here
                      </a>
                    ) : (
                      <Text className="p-2 bg-orange-300 w-max font-bold text-sm text-white  rounded-full">
                        Waiting for approval
                      </Text>
                    )
                  ) : (
                    <Text>No endorsement yet</Text>
                  )}
                </div>
              )}

              {/* Next Step Button */}
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleNextStep}
                  disabled={
                    !stepOneDocuments.every((doc) => doc.status === "Approved")
                  }
                  className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold ${
                    !stepOneDocuments.every((doc) => doc.status === "Approved")
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <>
              {/* Document List */}
              <div className="space-y-4">
                {stepTwoDocuments.map((doc) => {
                  if (doc) {
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
                      >
                        {/* Document Name */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {doc.name}
                          </h3>
                          {/* Dynamically render status color */}
                          <div
                            className={`text-sm flex gap-1 items-center ${getStatusColor(
                              doc.status
                            )}`}
                          >
                            <Text>Status:</Text>
                            <Text
                              className={`${getStatusBgColor(
                                doc.status
                              )} p-1 rounded-full`}
                            >
                              {doc.status}
                            </Text>
                          </div>
                        </div>

                        {/* Upload or View */}
                        <div className="flex items-center space-x-4">
                          {doc.file_path ? (
                            <>
                              <a
                                href={toFilePath(doc.file_path)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                              >
                                View File
                              </a>
                              {doc.can_change && (
                                <label className="flex items-center space-x-2">
                                  <Input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                      handleFileUpload(e, doc.id)
                                    }
                                    className="hidden"
                                  />
                                  <span className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
                                    Change File
                                  </span>
                                </label>
                              )}
                            </>
                          ) : (
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => handleFileUpload(e, doc.id)}
                              className="file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-500 file:text-white file:cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  onClick={handlePreviousStep}
                  className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                  <span>Previous</span>
                </Button>

                {/* Next Button */}
                <Button
                  onClick={handleNextStep}
                  disabled={
                    !stepTwoDocuments.every((doc) => doc.status === "Approved")
                  }
                  className={`flex items-center justify-center px-6 py-3 rounded-lg font-semibold ${
                    !stepTwoDocuments.every((doc) => doc.status === "Approved")
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight
                    className={`h-5 w-5 ${
                      !uploadedFiles.coverLetter || !uploadedFiles.resume
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                  />
                </Button>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <div className="p-6">
              {!isSubmitted ? (
                <>
                  {/* Summary Details */}
                  <h2 className="text-xl font-semibold mb-4">
                    Summary Application
                  </h2>
                  <div className="mb-6">
                    <h3 className="font-medium text-lg">Company Details</h3>
                    <p className="text-gray-700 mt-2">
                      <strong>Company Name:</strong> ABC Company
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Job Title:</strong> Petroleum Engineer
                    </p>

                    <p className="text-gray-700 mt-2">
                      <strong>Program Type:</strong> Internship
                    </p>
                  </div>

                  {/* Uploaded Documents */}
                  <div className="mb-6">
                    <h3 className="font-medium text-lg">Uploaded Documents</h3>
                    <ul className="mt-2 text-gray-700">
                      <li>
                        <strong>Cover Letter:</strong>{" "}
                        {uploadedFiles.coverLetter ? (
                          <a
                            href={uploadedFiles.coverLetter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          "Not Uploaded"
                        )}
                      </li>
                      <li>
                        <strong>Resume:</strong>{" "}
                        {uploadedFiles.resume ? (
                          <a
                            href={uploadedFiles.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          "Not Uploaded"
                        )}
                      </li>
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between items-center mt-6">
                    {/* Previous Button */}
                    <button
                      onClick={handlePreviousStep}
                      className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                      <span>Previous</span>
                    </button>

                    {/* Return Button */}
                    <button
                      onClick={handleReturn}
                      className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                      Return
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Confirmation */}
                  <h2 className="text-xl font-semibold text-center mb-4">
                    Confirmation
                  </h2>
                  <p className="text-gray-700 text-center mb-6">
                    Your application has been submitted successfully. Please
                    wait for approval.
                  </p>
                  <div className="text-center">
                    <button className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">
                      Okay
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          {currentStep === 4 && (
            <>
              <h2 className="text-xl font-semibold">Approval</h2>
              <p>Your application is under review. Please wait for updates.</p>
            </>
          )}
        </div>
      </div>
    </Page>
  );
};

export default StudentJobApplicationPage;
