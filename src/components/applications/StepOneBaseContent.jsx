import React, { useEffect, useState } from "react";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";
import toFilePath from "../../utils/baseURL";
import { Button, Field, Input, Label } from "@headlessui/react";
import { ChevronRight } from "lucide-react";
import EndorsementRequestForm from "../forms/EndorsementRequestForm";
import FormModal from "../modals/FormModal";
import Text from "../common/Text";
import { getRequest, postRequest } from "../../api/apiHelpers";
import Loader from "../common/Loader";

const StepOneBaseContent = ({
  application,
  stepOneDocuments = [],
  handleFileUpload = () => {
    console.log("Upload File Ready.");
  },
  handleNextStep,
}) => {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Button State
  const [isClickedButtonRequest, setIsClickedButtonRequest] = useState(false);

  // Error State
  const [errors, setErrors] = useState({});

  // console.log(application);

  /**
   * Endorsement Request Form
   *
   */
  const [endorsement, setEndorsement] = useState({});
  const [description, setDescription] = useState("");
  const [studentIds, setStudentIds] = useState("");

  // Open Modal Endorsement Form
  const openEndorsementForm = () => {
    setIsOpen(true);
  };

  // Handle student ID input change
  const handleStudentIdsChange = (e) => {
    setStudentIds(e.target.value);
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const fetchEndorsement = async () => {
    // Set Loading
    setLoading(true);

    try {
      const response = await getRequest({
        url: `/api/v1/work-posts/${application.work_post_id}/endorsement`,
      });

      if (response) {
        // console.log(response);
        setEndorsement(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function that submits endorsement request
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
        application_id: application.id,
        work_post_id: application.work_post_id, // Dynamic data
        requested_by_id: application.student_id, // Dynamic user ID
        description: description,
        student_ids: filteredStudentIds, // Process comma-separated student IDs
      };

      // console.log(payload);

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
        // navigate(location.pathname, { replace: true });
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

  useEffect(() => {
    fetchEndorsement();
  }, []);

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <>
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

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Upload Required Documents
        </h2>
        <p className="text-gray-600">
          Please upload the following documents to proceed with your
          application. All documents must be marked as
          <span className="font-medium text-green-600"> Approve</span> to move
          to the next step.
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
                          <div>
                            <label className="flex items-center space-x-2">
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileUpload(e, doc.id)}
                                className="hidden"
                              />
                              <span className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300">
                                Change File
                              </span>
                            </label>
                          </div>
                        )}
                      </>
                    ) : (
                      <Input
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
        <div className="flex flex-col justify-start mt-4 items-start">
          <Button
            onClick={openEndorsementForm}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              endorsement ||
              [10, 11, 12].includes(status) ||
              isClickedButtonRequest
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
            disabled={
              endorsement ||
              [10, 11, 12].includes(status) ||
              isClickedButtonRequest
            }
          >
            Request Endorsement
          </Button>

          {/* <span className="text-green-600 mt-2">
            Already requested an endorsement letter
          </span> */}
        </div>

        {endorsement && (
          <div className="flex flex-col">
            {endorsement.endorsement_file ? (
              endorsement.status_id === 2 ? (
                <a
                  href={`${toFilePath(endorsement.endorsement_file)}`}
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
    </>
  );
};

export default StepOneBaseContent;
