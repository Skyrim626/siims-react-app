import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import GenerateAcceptanceLetter from "../../components/letters/GenerateAcceptanceLetter";
import { Button, Field, Input, Label } from "@headlessui/react";
import { pdf } from "@react-pdf/renderer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getFullName from "../../utils/getFullName";
import SignatureCapture from "../../components/letters/SignatureCanvas";
import { getRequest, postFormDataRequest } from "../../api/apiHelpers";
import logo from "../../assets/images/company/Logo-Reduced-Border-1.png";

const CompanyAcceptanceLetterPage = () => {
  // Open Location and Navigate
  const location = useLocation();
  const navigate = useNavigate();
  // Get Params
  const { application_id: id } = useParams();

  // Open Date
  const date = new Date();

  /**
   * Location State
   */
  const { application } = location.state;

  // Modal State
  const [isOpenSignatureModal, setIsOpenSignatureModal] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);
  const [logoURL, setLogoURL] = useState("");

  /**
   * Input States
   */
  const [signatureImage, setSignatureImage] = useState(null);
  // Set the default date to the current date in the desired format
  const [currentDate, setCurrentDate] = useState(
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  /* const [applicantFullName, setApplicantFullName] = useState(
    getFullName(
      application.first_name,
      application.middle_name,
      application.last_name
    )
  ); */
  const [applicantFullName, setApplicantFullName] = useState(application.name);
  const [companyName, setCompanyName] = useState(application.company);
  const [workType, setWorkType] = useState("internship");
  const [ownerName, setOwnerName] = useState("");
  const [position, setPosition] = useState(
    application.job_title || "HR Specialist"
  );
  const [fileName, setFileName] = useState("acceptance-letter.pdf");

  // Function to fetch logo
  const fetchLogo = async () => {
    // Set Loading
    setLoading(true);
    try {
      const response = await getRequest({
        url: "/api/v1/profiles/views/companies/logo-url",
      });

      if (response) {
        // console.log(response);
        setLogoURL(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call Method
    fetchLogo();
  }, []);

  /**
   * Function that calls the Endorsement Letter
   */
  const callAcceptanceLetter = () => {
    return (
      <GenerateAcceptanceLetter
        logo={logo}
        signatureImage={signatureImage}
        currentDate={currentDate}
        applicantFullName={applicantFullName}
        companyName={companyName}
        ownerName={ownerName}
        position={position}
        workType="internship"
      />
    );
  };

  /**
   * Function that view the PDF
   */
  const viewPdf = async () => {
    try {
      const document = callAcceptanceLetter();
      const blob = await pdf(document).toBlob();

      const blobUrl = URL.createObjectURL(blob);
      // console.log(blobUrl); // Log the URL
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const submitAcceptanceLetter = async () => {
    // Start Loading
    setLoading(true);

    try {
      // Generate the PDF as a Blob using react-pdf
      const pdfBlob = await pdf(callAcceptanceLetter()).toBlob();

      // Create a File from the Blob
      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", pdfFile);

      // Handle response from the server
      const response = await postFormDataRequest({
        url: `/api/v1/applications/${id}/submit-acceptance-letter`,
        data: formData,
      });

      if (response) {
        navigate(-1); // Navigate back upon success
      }
    } catch (error) {
      console.error("Error uploading acceptance letter:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Loader loading={loading} />

      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-2xl font-bold mb-4">Generate Acceptance Letter</h1>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">Date</Label>
          <Input
            type="text"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter date"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Applicant Name
          </Label>
          <Input
            type="text"
            value={applicantFullName}
            onChange={(e) => setApplicantFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter applicant name"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Your Company Name
          </Label>
          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter your company name"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Your Name
          </Label>
          <Input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter your name"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Your Position
          </Label>
          <Input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter your position"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            File Name
          </Label>
          <Input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter file name"
          />
        </Field>

        <div className="flex justify-end space-x-5">
          <Button
            onClick={() => setIsOpenSignatureModal(!isOpenSignatureModal)}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Signature
          </Button>

          <Button
            onClick={viewPdf}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            View PDF
          </Button>
          <Button
            onClick={submitAcceptanceLetter}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Submit Acceptance Letter
          </Button>
        </div>
      </div>

      {isOpenSignatureModal && (
        <SignatureCapture
          setSignatureImage={setSignatureImage}
          isOpen={isOpenSignatureModal}
          setIsOpenSignatureModal={setIsOpenSignatureModal}
        />
      )}
    </Page>
  );
};

export default CompanyAcceptanceLetterPage;
