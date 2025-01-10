import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { Button, Field, Input, Label } from "@headlessui/react";
import getFullName from "../../utils/getFullName";
import { getFullAddress } from "../../utils/formatAddress";
import Text from "../../components/common/Text";
import SignatureCapture from "../../components/letters/SignatureCanvas";
import GenerateEndorsementLetter from "../../components/letters/GenerateEndorsementLetter";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";

import image1 from "../../assets/images/logo/head.png";
import image2 from "../../assets/images/logo/CITC_LOGO.png";
import { postFormDataRequest } from "../../api/apiHelpers";

const ChairpersonGenerateEndorsemenLetterPage = () => {
  // Open Location and Navigate
  const navigate = useNavigate();
  const location = useLocation();

  // Modal State
  const [isOpenSignatureModal, setIsOpenSignatureModal] = useState(false);

  // Error State
  const [errors, setErrors] = useState({});

  /**
   * Function that calls the Endorsement Letter
   */
  const callEndorsementLetter = () => {
    return (
      <GenerateEndorsementLetter
        imageHeight={80}
        signatureImage={signatureImage}
        currentDate={currentDate}
        ownerName={ownerName}
        position={position}
        companyName={companyName}
        fullAddress={fullAddress}
        greetingMessage={greetingMessage}
        college={college}
        program={program}
        hourDuration={hourDuration}
        startingMonth={startingMonth}
        endingMonth={endingMonth}
        targetYear={targetYear}
        mainStudent={main_student.user}
        otherStudents={otherStudents}
        workType={workType}
        deanOfficeNumber={deanOfficeNumber}
        localNumber={localNumber}
        ojtCoordinatorFullName={ojtCoordinatorFullName}
        ojtCoordinatorMail={ojtCoordinatorMail}
        chairpersonFullName={chairpersonFullName}
        deanFullName={deanFullName}
      />
    );
  };

  /**
   * Function that view the PDF
   */
  const viewPdf = async () => {
    try {
      const document = callEndorsementLetter();
      const blob = await pdf(document).toBlob();

      const blobUrl = URL.createObjectURL(blob);
      // console.log(blobUrl); // Log the URL
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  /**
   * Function that submits the Endorsement Letter to the Dean
   */
  const handleSubmitForApproval = async () => {
    /* if (!signatureImage) {
      setErrors({ pdf_file: "The pdf file is required" });
      return;
    } */

    setLoading(true); // Start loading

    try {
      // Generate the PDF as a Blob using react-pdf
      const pdfBlob = await pdf(callEndorsementLetter()).toBlob();

      // Create a File from the Blob
      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("pdf_file", pdfFile);

      // POST the form data to your endpoint
      const response = await postFormDataRequest({
        url: `/api/v1/endorsement-letter-requests/${request_id}/upload`,
        data: formData,
      });

      if (response) {
        navigate(-1); // Navigate back upon success
      }
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
    } finally {
      setLoading(false); // Stop loading
    }
  };

  /**
   * Location State
   */
  const {
    requested_by,
    endorse_students,
    main_student,
    request_id,
    company_details,
    program_details,
    college_details,
    coordinator_details,
    chairperson_details,
    dean_details,
  } = location.state;

  // console.log(company_details);
  // console.log(chairperson_details);

  // Open Date
  const date = new Date();

  // Loading State
  const [loading, setLoading] = useState(false);

  /**
   * Signature State
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
  const [ownerName, setOwnerName] = useState(
    company_details.first_name || company_details.last_name
      ? getFullName(
          company_details.first_name,
          company_details.middle_name,
          company_details.last_name
        )
      : "No Name"
  );
  const [position, setPosition] = useState("HR Specialist");
  const [companyName, setCompanyName] = useState(company_details.name);
  const [fullAddress, setFullAddress] = useState(
    getFullAddress({
      street: company_details.user.street,
      barangay: company_details.user.barangay,
      city: company_details.user.city_municipality,
      province: company_details.user.province,
      postalCode: company_details.user.postal_code,
    })
  );
  const [greetingMessage, setGreetingMessage] = useState("Dear Ms. Lim,");
  const [college, setCollege] = useState(college_details.name);
  const [program, setProgram] = useState(program_details.name);
  const [hourDuration, setHourDuration] = useState("486 hours");
  const [startingMonth, setStartingMonth] = useState("February");
  const [endingMonth, setEndingMonth] = useState("March");
  const [targetYear, setTargetYear] = useState(
    date.toLocaleDateString("en-US", {
      year: "numeric",
    })
  );

  const [mainStudent, setMainStudent] = useState(main_student);
  const [otherStudents, setOtherStudents] = useState(endorse_students);
  const [workType, setWorkType] = useState("internship");
  const [deanOfficeNumber, setDeanOfficeNumber] = useState("088-857-1739");
  const [localNumber, setLocalNumber] = useState("1153");
  const [ojtCoordinatorFullName, setOjtCoordinatorFullName] = useState(
    getFullName(
      coordinator_details.user.first_name,
      coordinator_details.user.middle_name,
      coordinator_details.user.last_name
    )
  );
  const [ojtCoordinatorMail, setOjtCoordinatorMail] = useState(
    coordinator_details.user.email
  );
  const [chairpersonFullName, setChairpersonFullName] = useState(
    `ENGR, ${getFullName(
      chairperson_details.first_name,
      chairperson_details.middle_name,
      chairperson_details.last_name
    ).toUpperCase()}`
  );
  const [deanFullName, setDeanFullName] = useState(
    `Dr. ${getFullName(
      dean_details.first_name,
      dean_details.middle_name,
      dean_details.last_name
    ).toUpperCase()}`
  );

  // File Name
  const [fileName, setFileName] = useState("endorsement-letter.pdf");

  return (
    <>
      <Loader loading={loading} />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-2xl font-bold mb-4">Generate Endorsement Letter</h1>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">Date</Label>
          <Input
            type="text"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter Date"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Greeting Message
          </Label>
          <Input
            type="text"
            value={greetingMessage}
            onChange={(e) => setGreetingMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Dear Mr.Lim"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Recipient Name
            </Label>
            <Input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter Recipient"
            />
          </Field>
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Position
            </Label>
            <Input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="HR Specialist"
            />
          </Field>
        </div>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Company
          </Label>
          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Company XYZ"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Address
          </Label>
          <Input
            type="text"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Street,Barangay,Province,City,Postal-Code"
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Chairperson
            </Label>
            <Input
              type="text"
              value={chairpersonFullName}
              onChange={(e) => setChairpersonFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Engr. Jay Noel Rojo"
            />
          </Field>
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Dean
            </Label>
            <Input
              type="text"
              value={deanFullName}
              onChange={(e) => setDeanFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              OJT Coordinator
            </Label>
            <Input
              type="text"
              value={ojtCoordinatorFullName}
              onChange={(e) => setOjtCoordinatorFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter coordinator name (e.g., Dr. Smith)"
            />
          </Field>
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              OJT Coordinator's Email
            </Label>
            <Input
              type="text"
              value={ojtCoordinatorMail}
              onChange={(e) => setOjtCoordinatorMail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Office Number
            </Label>
            <Input
              type="text"
              value={deanOfficeNumber}
              onChange={(e) => setDeanOfficeNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Local Number
            </Label>
            <Input
              type="text"
              value={localNumber}
              onChange={(e) => setLocalNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Starting Month
            </Label>
            <Input
              type="text"
              value={startingMonth}
              onChange={(e) => setStartingMonth(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Ending Month
            </Label>
            <Input
              type="text"
              value={endingMonth}
              onChange={(e) => setEndingMonth(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Year
            </Label>
            <Input
              type="text"
              value={targetYear}
              onChange={(e) => setTargetYear(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              College
            </Label>
            <Input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Program
            </Label>
            <Input
              type="text"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter recipient (e.g., Dear Dr. Smith)"
            />
          </Field>
        </div>

        <h2 className="text-xl font-semibold mb-4">Students to Endorse</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                  Student ID
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                  Full Name
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-600">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {main_student.id}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {getFullName(
                    main_student.user.first_name,
                    main_student.user.middle_name,
                    main_student.user.last_name
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {main_student.user.email}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {main_student.user.phone_number}
                </td>
              </tr>
              {endorse_students &&
                endorse_students.length > 0 &&
                endorse_students.map((student, index) => (
                  <tr key={index} className="bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                      {student.student_id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                      {student.full_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                      {student.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                      {student.phone_number}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

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
          <PDFDownloadLink
            document={callEndorsementLetter()}
            fileName={fileName}
          >
            {({ loading }) =>
              loading ? (
                <Button className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-not-allowed">
                  Loading Document...
                </Button>
              ) : (
                <Button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                  Download Document
                </Button>
              )
            }
          </PDFDownloadLink>

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
          <div>
            <Button
              onClick={handleSubmitForApproval}
              className="text-white py-2 px-4 rounded-md font-semibold bg-blue-500 hover:bg-blue-600"
            >
              Submit for approval to Dean
            </Button>
            {errors["pdf_file"] && <Text>The pdf file is required</Text>}
          </div>

          {isOpenSignatureModal && (
            <SignatureCapture
              setSignatureImage={setSignatureImage}
              isOpen={isOpenSignatureModal}
              setIsOpenSignatureModal={setIsOpenSignatureModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChairpersonGenerateEndorsemenLetterPage;
