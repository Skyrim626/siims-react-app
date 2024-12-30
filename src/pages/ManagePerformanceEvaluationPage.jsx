import React, { useState } from "react";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import { replace, useLocation, useNavigate, useParams } from "react-router-dom";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import {
  Button,
  Field,
  Input,
  Label,
  Select,
  Textarea,
} from "@headlessui/react";
import { showFailedAlert } from "../utils/toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import { document } from "postcss";
import GeneratePerformanceEvaluationReport from "../components/letters/GeneratePerformanceEvaluationReport";
import { postFormDataRequest } from "../api/apiHelpers";
import { Modal } from "@mui/material";
import FormModal from "../components/modals/FormModal";
import UploadFile from "../components/common/UploadFile.";

// A function that checks if criteria have scores
const isCriteriaChecked = (criterias, scores) => {
  // Check if all criteria have scores
  const totalCriteriaItems = criterias.reduce(
    (count, criterion) => count + criterion.items.length,
    0
  );

  if (Object.keys(scores).length < totalCriteriaItems) {
    // alert("");
    showFailedAlert("Please score all criteria before submitting or viewing.");
    return false;
  }

  return true;
};

const ManagePerformanceEvaluationPage = ({ authorizeRole }) => {
  // Open Params
  const { id: applicationId } = useParams();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Open navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Select State
  const [selectedFile, setSelectedFile] = useState(null);

  // Safely access the row data
  const {
    studentName,
    jobTitle: job,
    companyName: company,
    noOfHours,
    companyFullAddress: companyAddress,
    officeName: office,
  } = location.state || {};

  // Input State
  const [studentFullName, setStudentFullName] = useState(studentName || "");
  const [trainingHours, setTrainingHours] = useState(noOfHours || "");
  const [companyName, setCompanyName] = useState(company || "");
  const [companyFullAddress, setCompanyFullAddress] = useState(companyAddress);
  const [noOfTrainingHours, setNoOfTrainingHours] = useState(noOfHours || "");
  const [officeName, setOfficeName] = useState(office || "");
  const [jobTitle, setJobTitle] = useState(job || "");
  const [scores, setScores] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [equivalentRating, setEquivalentRating] = useState(0);
  const [comments, setComments] = useState("");

  // File Name
  const [fileName, setFileName] = useState("performance-evaluation.pdf");

  // Criterias
  const criterias = [
    {
      category: "ATTENDANCE AND PUNCTUALITY",
      items: [
        "Reports for work on time.",
        "Reports for work regularly.",
        "Requests permission before getting absent.",
      ],
    },
    {
      category: "PERFORMANCE",
      items: [
        "Knows his/her work well.",
        "Completes assignments on time.",
        "Works with speed and accuracy.",
        "Ensures quality of work.",
        "Produces much output with less time.",
        "Displays resourcefulness.",
        "Requires less supervision.",
        "Has initiative.",
      ],
    },
    {
      category: "GENERAL ATTITUDE",
      items: [
        "Shows interest in his/her work.",
        "Accepts suggestions.",
        "Cooperates well with everybody.",
        "Exhibits honesty and dependability.",
        "Follows instructions.",
        "Observes safety rules and regulations.",
        "Respects superiors.",
        "Accepts responsibilities",
        "Shows friendliness and a pleasant attitude.",
      ],
    },
  ];

  // Open and close modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedFile(null); // Clear selected file when closing modal
    setIsModalOpen(false);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleSubmitFile = async () => {
    if (!selectedFile) {
      showFailedAlert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("performance_report", selectedFile);

      // Example API endpoint
      const response = await postFormDataRequest({
        url: `/api/v1/reports/${applicationId}/performance-evaluation/submit`,
        data: formData,
      });

      if (response) {
        // alert("File uploaded successfully!"); // Replace with your preferred notification
        closeModal();
      }
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
      navigate(-1, {
        replace: true,
      });
    }
  };

  // Handles Score Change
  const handleScoreChange = (criterionIndex, itemIndex, score) => {
    const key = `${criterionIndex}-${itemIndex}`;
    const updatedScores = { ...scores, [key]: score };
    setScores(updatedScores);

    const total = Object.values(updatedScores).reduce(
      (acc, val) => acc + parseInt(val || 0, 10),
      0
    );
    setTotalPoints(total);

    let rating;
    if (total >= 96) rating = 1.25;
    else if (total >= 91) rating = 1.5;
    else if (total >= 86) rating = 1.75;
    else if (total >= 81) rating = 2.0;
    else if (total >= 76) rating = 2.25;
    else if (total >= 71) rating = 2.5;
    else if (total >= 66) rating = 2.75;
    else if (total >= 61) rating = 3.0;
    else if (total >= 56) rating = 4.0;
    else rating = 5.0;

    setEquivalentRating(rating);
  };

  // Function that calls the Performance Evaluation
  const callPerformanceEvaluationReport = () => {
    // Check if criteria is checked
    return (
      <GeneratePerformanceEvaluationReport
        criterias={criterias}
        scores={scores}
        studentName={studentFullName}
        companyName={companyName}
        noOfTrainingHours={noOfTrainingHours}
        companyAddress={companyFullAddress}
        comments={comments}
        jobTitle={jobTitle}
        officeName={officeName}
      />
    );
  };

  // Function that views the performance evaluation
  const viewPerformanceEvaluationPDF = async () => {
    try {
      const document = callPerformanceEvaluationReport();
      const blob = await pdf(document).toBlob();

      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text={"Performance Evaluation"} />
        <Text className="text-md text-blue-950">
          This is where you evaluate{" "}
          <span className="font-bold">{studentFullName}'s'</span> performance.
        </Text>
      </Section>

      <form className="flex flex-col gap-3 mt-3 bg-white p-3 rounded-md shadow-md">
        <div className="grid grid-cols-2 gap-3">
          <Field className="mb-4">
            <Label>Name of Student</Label>

            <Input
              type="text"
              value={studentFullName}
              onChange={(e) => setStudentFullName(e.target.value)}
              placeholder="Student full name"
              className="w-full border rounded p-2"
              required
            />
          </Field>

          <Field className="mb-4">
            <Label>Name of Company</Label>

            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name"
              className="w-full border rounded p-2"
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field className="mb-4">
            <Label>Number of Training Hours</Label>

            <Input
              type="text"
              value={noOfTrainingHours}
              onChange={(e) => setNoOfTrainingHours(e.target.value)}
              placeholder="Number of training hours"
              className="w-full border rounded p-2"
              required
            />
          </Field>

          <Field className="mb-4">
            <Label>Address of Company</Label>

            <Input
              type="text"
              value={companyFullAddress}
              onChange={(e) => setCompanyFullAddress(e.target.value)}
              placeholder="Address of company"
              className="w-full border rounded p-2"
              required
            />
          </Field>
        </div>

        {/* Job Title */}
        <div>
          <Field className="mb-4">
            <Label>Job Title</Label>

            <Input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
              className="w-full border rounded p-2"
              required
            />
          </Field>
        </div>

        {/* Office Name */}
        <div>
          <Field className="mb-4">
            <Label>Office</Label>

            <Input
              type="text"
              value={officeName}
              onChange={(e) => setOfficeName(e.target.value)}
              placeholder="Job Title"
              className="w-full border rounded p-2"
              required
            />
          </Field>
        </div>

        <Text>
          <span className="font-bold uppercase">Directions:</span> Please mark{" "}
          <span className="font-bold">(•)</span> on the appropriate column the
          rating that best describes the performance of the student-trainee.
          Please use the ratings as follows:{" "}
          <span className="font-bold">five(5)</span> as the highest and{" "}
          <span className="font-bold">one (1)</span> as the lowest rate.
        </Text>

        <table className="table-auto w-full mb-6 border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="uppercase border border-gray-300 px-4 py-2 text-left">
                Criteria
              </th>
              {[1, 2, 3, 4, 5].map((score) => (
                <th
                  key={score}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {score}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criterias.map((criterion, criterionIndex) => (
              <React.Fragment key={criterionIndex}>
                {/* Category Row */}
                <tr className="bg-gray-100">
                  <td
                    colSpan="6"
                    className="uppercase border border-gray-300 px-4 py-2 font-bold"
                  >
                    {criterion.category}
                  </td>
                </tr>
                {/* Items Row */}
                {criterion.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className=" border border-gray-300 px-4 py-2">
                      {item}
                    </td>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <td
                        key={score}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        <input
                          type="radio"
                          name={`score-${criterionIndex}-${itemIndex}`}
                          value={score}
                          onChange={() =>
                            handleScoreChange(criterionIndex, itemIndex, score)
                          }
                          className="form-radio text-blue-600"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Conversion Table */}
        <div>
          <Text className="text-md font-bold uppercase">Conversion Table</Text>

          <table className="table-auto w-full mb-6 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="uppercase text-center border border-gray-300 px-4 py-2">
                  Total Points
                </th>

                <th className="uppercase text-center border border-gray-300 px-4 py-2">
                  Equivalent Rating
                </th>

                <th className="uppercase text-center border border-gray-300 px-4 py-2">
                  Total Points
                </th>

                <th className="uppercase text-center border border-gray-300 px-4 py-2">
                  Equivalent Rating
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border font-bold">96 - 100</td>
                <td className="border font-bold">1.25</td>
                <td className="border font-bold">71 - 75</td>
                <td className="border font-bold">2.50</td>
              </tr>

              <tr className="text-center">
                <td className="border font-bold">91 - 95</td>
                <td className="border font-bold">1.50</td>
                <td className="border font-bold">66 - 70</td>
                <td className="border font-bold">2.75</td>
              </tr>

              <tr className="text-center">
                <td className="border font-bold">86 - 90</td>
                <td className="border font-bold">1.75</td>
                <td className="border font-bold">61 - 65</td>
                <td className="border font-bold">3.00</td>
              </tr>

              <tr className="text-center">
                <td className="border font-bold">81 - 85</td>
                <td className="border font-bold">2.00</td>
                <td className="border font-bold">56 - 60</td>
                <td className="border font-bold">4.00</td>
              </tr>

              <tr className="text-center">
                <td className="border font-bold">76 - 80</td>
                <td className="border font-bold">2.25</td>
                <td className="border font-bold">55 and below</td>
                <td className="border font-bold">5.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4 ">
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5} // Controls the initial height
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 resize-y" // resize-y allows vertical resizing
            placeholder="Type your comments and suggestions here..."
          />
        </div>

        <div className="text-right space-x-4">
          <Button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={viewPerformanceEvaluationPDF}
          >
            View in PDF
          </Button>
          <PDFDownloadLink
            document={callPerformanceEvaluationReport()}
            fileName={fileName}
          >
            <Button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download
            </Button>
          </PDFDownloadLink>

          <Button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleOpenModal}
          >
            Upload Evaluation
          </Button>
        </div>
      </form>

      {/* Modal for File Upload */}
      <FormModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        modalTitle="Upload Performance Report"
        onSubmit={handleSubmitFile}
      >
        <UploadFile
          title="Upload Performance Report"
          file={selectedFile}
          set={setSelectedFile}
          handleFileChange={handleFileChange}
        />
      </FormModal>
    </Page>
  );
};

export default ManagePerformanceEvaluationPage;
