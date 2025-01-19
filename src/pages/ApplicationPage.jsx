import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import { getRequest, postFormDataRequest } from "../api/apiHelpers";
import StepOneBaseContent from "../components/applications/StepOneBaseContent";
import StepTwoBaseContent from "../components/applications/StepTwoBaseContent";

const ApplicationPage = ({ authorizeRole }) => {
  // Params
  const { application_id } = useParams();

  // Loading state
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Container State
  const [application, setApplication] = useState({});

  // Step-1 Documents
  const [stepOneDocuments, setStepOneDocuments] = useState([]);
  // Step-2 Documents
  const [stepTwoDocuments, setStepTwoDocuments] = useState([]);

  // Progress Indicator Data (now 4 steps)
  const steps = [
    "Application Requirements",
    "Complete Requirements",
    // "Requirements",
    // "Summary",
    "Approved",
  ];

  // Fetch Application
  const fetchApplication = async () => {
    // Set Loading
    setLoading(true);

    try {
      const response = await getRequest({
        url: `/api/v1/applications/${application_id}`,
        params: {
          requestedBy: authorizeRole,
        },
      });

      if (response) {
        // console.log(response);

        setApplication(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  // Fetch Step One Documents
  const fetchStepOneDocuments = async () => {
    // Set Loading
    setLoading(true);
    try {
      const response = await getRequest({
        url: `/api/v1/applications/${application_id}/step-1/get`,
      });

      if (response) {
        setStepOneDocuments(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Step Two Documents
  const fetchStepTwoDocuments = async () => {
    // Set Loading State
    setLoading(true);

    try {
      const response = await getRequest({
        url: `/api/v1/applications/${application_id}/step-2/get`,
      });

      if (response) {
        setStepTwoDocuments(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call Methods
    fetchApplication();
    fetchStepOneDocuments();
    fetchStepTwoDocuments();
  }, []);

  // Submit Document
  const handleFileUpload = async (e, fileType) => {
    // Loading State
    setLoading(true);

    const file = e.target.files[0];
    if (file) {
      // Simulate API call to send the file to the backend
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", file);

      try {
        // console.log("Uploading file to the backend...");

        const response = await postFormDataRequest({
          url: `/api/v1/applications/${application.id}/upload-document/${fileType}`, // ID of that document
          data: formData,
        });
        console.log(response);
        // Navigate after submitting
        if (response) {
          // console.log();
          // setStepOneDocuments((prev) => [...prev, ...response.data]);
          /* setStepOneDocuments((prevData) =>
            prevData.map((data) =>
              data.id === fileType ? { ...data, ...response.data } : data
            )
          ); */

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

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4)); // Only 4 steps now
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <Page>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Apply for {application.job_title}
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
                className="flex flex-col items-center z-10 w-1/2"
              >
                {/* Step Circle with Checkmark if Done */}
                <div
                  className={`h-14 w-14 flex items-center justify-center rounded-full text-white font-bold ${
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
                  className={`mt-2 text-center text-sm font-semibold ${
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
            <StepOneBaseContent
              application={application}
              stepOneDocuments={stepOneDocuments}
              handleFileUpload={handleFileUpload}
              handlePreviousStep={handlePreviousStep}
              handleNextStep={handleNextStep}
            />
          )}
          {currentStep === 2 && (
            <>
              {/* Document List */}
              <StepTwoBaseContent
                stepTwoDocuments={stepTwoDocuments}
                handleFileUpload={handleFileUpload}
                handlePreviousStep={handlePreviousStep}
                handleNextStep={handleNextStep}
              />
            </>
          )}
        </div>
      </div>
    </Page>
  );
};

export default ApplicationPage;
