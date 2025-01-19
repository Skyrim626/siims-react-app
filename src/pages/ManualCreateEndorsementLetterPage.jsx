import { Button, Field, Input, Label } from "@headlessui/react";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateEndorsementLetter from "../components/letters/GenerateEndorsementLetter";
import SignatureCapture from "../components/letters/SignatureCanvas";
import EndorseStudentModal from "../components/modals/EndorseStudentModal";
import axiosClient from "../api/axiosClient";
import { postRequest } from "../api/apiHelpers";
import SearchCoordinatorModal from "../components/modals/SearchCoordinatorModal";
import SearchCompanyModal from "../components/modals/SearchCompanyModal";

const ManualCreateEndorsementLetterPage = () => {
  // Open Navigate
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // File Name
  const [fileName, setFileName] = useState("endorsement-letter.pdf");

  /**
   *
   * Input States
   *
   */
  const date = new Date();

  // Modal State
  const [isOpenSignatureModal, setIsOpenSignatureModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCoordinatorModalOpen, setIsCoordinatorModalOpen] = useState(false);
  const [isSearchCoordinatorModalOpen, setIsSearchCoordinatorModalOpen] =
    useState(false);
  const [isSearchCompanyModalOpen, setIsSearchCompanyModalOpen] =
    useState(false);

  // Set the default date to the current date in the desired format
  const [requestedID, setRequestedID] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("Dear Mr John Doe,");
  const [ownerName, setOwnerName] = useState("");
  const [position, setPosition] = useState("HR Specialist");
  const [companyName, setCompanyName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [program, setProgram] = useState(
    "Bachelor of Science in Information Technology"
  );
  const [college, setCollege] = useState(
    "College of Information Technology and Computing"
  );
  const [ojtCoordinatorFullName, setOjtCoordinatorFullName] = useState("");
  const [workType, setWorkType] = useState("HR Specialist");

  const [deanFullName, setDeanFullName] = useState("Dr. Junar A. Landicho");
  const [deanOfficeNumber, setDeanOfficeNumber] = useState("088-857-1739");
  const [ojtCoordinatorMail, setOjtCoordinatorMail] = useState("");
  const [localNumber, setLocalNumber] = useState("1153");
  const [chairpersonFullName, setChairpersonFullName] = useState(
    "Engr. Jay Noel Rojo"
  );
  const [students, setStudents] = useState([]);

  const [newStudent, setNewStudent] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [remarks, setRemarks] = useState("Walk-In");
  const [signatureImage, setSignatureImage] = useState(null);
  const [hourDuration, setHourDuration] = useState(null);
  const [startingMonth, setStartingMonth] = useState(null);
  const [endingMonth, setEndingMonth] = useState(null);
  const [targetYear, setTargetYear] = useState(null);
  const [currentDate, setCurrentDate] = useState(
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = () => {
    if (newStudent.id && newStudent.fullName && newStudent.email) {
      setStudents((prevStudents) => [...prevStudents, newStudent]);
      setNewStudent({ id: "", fullName: "", email: "", phoneNumber: "" }); // Clear input fields
    }

    if (requestedID === "") {
      // const lastStudent = students[students.length - 1]; // Select the last student
      setRequestedID(newStudent.id);
    }
  };

  /**
   * Function that calls the Endorsement Letter
   */
  const callEndorsementLetter = () => {
    return (
      <GenerateEndorsementLetter
        isAutomatic={false}
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
        otherStudents={students}
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

  const handlePrintAndSend = async () => {
    // Set Loading
    setLoading(true);

    // Step 1: Generate PDF
    const document = callEndorsementLetter();
    const blob = await pdf(document).toBlob();

    // Step 2: Open PDF in a new tab for printing
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");

    // Step 3: Add payload
    const student_ids = students.map((student) => ({ student_id: student.id }));

    const payload = {
      requested_by_id: requestedID,
      remarks,
      student_ids: student_ids,
    };

    // console.log(payload);

    /* const studentIds = students.map((student) => {
      return {
        student_id: student.id
      }
    }); */

    // setNewStudent({ id: "", fullName: "", email: "", phoneNumber: "" }); // Clear input fields

    // Step 4: Send data to backend
    try {
      const response = await postRequest({
        url: "/api/v1/endorsement-letter-requests/manual",
        data: payload,
      });

      if (response) {
        // navigate(-1);

        setOwnerName("");
        setCompanyName("");
        setFullAddress("");
        setOjtCoordinatorFullName("");
        setOjtCoordinatorMail("");
        setRequestedID("");
        setStudents([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  // Remove student by ID
  const handleRemoveStudent = (id) => {
    //console.log("ID: ", id);
    // console.log("Students: ", students);

    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
  };

  return (
    <div>
      {/* Modal for Endorsing Student */}
      {isModalOpen && (
        <EndorseStudentModal
          setNewStudent={setNewStudent}
          // setStudents={setStudents}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isSearchCoordinatorModalOpen && (
        <SearchCoordinatorModal
          setOjtCoordinatorFullName={setOjtCoordinatorFullName}
          setOjtCoordinatorMail={setOjtCoordinatorMail}
          setIsModalOpen={setIsSearchCoordinatorModalOpen}
        />
      )}

      {isSearchCompanyModalOpen && (
        <SearchCompanyModal
          setGreetingMessage={setGreetingMessage}
          setOwnerName={setOwnerName}
          setCompanyName={setCompanyName}
          setFullAddress={setFullAddress}
          setIsModalOpen={setIsSearchCompanyModalOpen}
        />
      )}

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
            placeholder="Dear Mr.John Doe"
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
              placeholder="Recipient Position"
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

        <div className="flex justify-center items-center">
          <Button
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-transform transform hover:bg-blue-600 focus:ring focus:outline-none focus:ring-blue-300 active:scale-95"
            onClick={() =>
              setIsSearchCompanyModalOpen(!isSearchCompanyModalOpen)
            }
          >
            Search Company
          </Button>
        </div>

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

        <div className="grid grid-cols-3 gap-3">
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              OJT Coordinator
            </Label>
            <Input
              type="text"
              value={ojtCoordinatorFullName}
              onChange={(e) => setOjtCoordinatorFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter Coordinator Name"
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
              placeholder="Enter SIPP Coordinator email"
            />
          </Field>

          <div className="flex justify-center items-center">
            <Button
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-transform transform hover:bg-blue-600 focus:ring focus:outline-none focus:ring-blue-300 active:scale-95"
              onClick={() =>
                setIsSearchCoordinatorModalOpen(!isSearchCoordinatorModalOpen)
              }
            >
              Search Coordinator
            </Button>
          </div>
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
              placeholder="Enter dean office number"
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
              placeholder="Enter local number"
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
              placeholder="Enter college"
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
              placeholder="Enter program"
            />
          </Field>
        </div>

        {/* Add Student Form */}
        <h2 className="text-xl font-semibold mb-4">Add Student</h2>
        <div className="grid grid-cols-4 gap-3 mb-6">
          <Input
            type="text"
            name="id"
            value={newStudent.id}
            onChange={handleInputChange}
            placeholder="Student ID"
            className="px-4 py-2 border rounded-md"
          />
          <Input
            type="text"
            name="fullName"
            value={newStudent.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="px-4 py-2 border rounded-md"
          />
          <Input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="px-4 py-2 border rounded-md"
          />
          <Input
            type="text"
            name="phoneNumber"
            value={newStudent.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="px-4 py-2 border rounded-md"
          />
        </div>

        <div className="space-x-2">
          <Button
            onClick={handleAddStudent}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Student
          </Button>

          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search Student
          </Button>
        </div>

        <h2 className="mt-3 text-xl font-semibold mb-4">Students to Endorse</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Phone Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No students added.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {student.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {student.fullName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {student.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {student.phoneNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleRemoveStudent(student.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {students && students.length > 0 && (
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Requested by (Student ID)
            </Label>
            <Input
              type="text"
              value={requestedID}
              onChange={(e) => setRequestedID(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter requested student ID"
              required
            />
          </Field>
        )}

        {/* <Field className="mb-6">
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
        </Field> */}

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Remarks
          </Label>
          <Input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter remakrs"
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
                  Download Signed Document
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

          <Button
            onClick={handlePrintAndSend}
            className={` text-white px-4 py-2 rounded-md shadow ${
              students.length > 0
                ? "bg-blue-500"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!(students.length > 0)}
          >
            Print and Send
          </Button>
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
  );
};

export default ManualCreateEndorsementLetterPage;
