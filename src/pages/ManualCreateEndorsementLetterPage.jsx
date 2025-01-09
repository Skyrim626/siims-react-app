import { Button, Field, Input, Label } from "@headlessui/react";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateEndorsementLetter from "../components/letters/GenerateEndorsementLetter";

const ManualCreateEndorsementLetterPage = () => {
  // Open Navigate
  const navigate = useNavigate();

  // Modal State
  const [isOpenSignatureModal, setIsOpenSignatureModal] = useState(false);

  // File Name
  const [fileName, setFileName] = useState("endorsement-letter.pdf");

  /**
   *
   * Input States
   *
   */
  const date = new Date();

  // Set the default date to the current date in the desired format
  const [greetingMessage, setGreetingMessage] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [position, setPosition] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [program, setProgram] = useState(
    "Bachelor of Science in Information Technology"
  );
  const [college, setCollege] = useState(
    "College of Information Technology and Computing"
  );
  const [ojtCoordinatorFullName, setOjtCoordinatorFullName] = useState("");
  const [workType, setWorkType] = useState("Intern");

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
    if (
      newStudent.id &&
      newStudent.fullName &&
      newStudent.email &&
      newStudent.phoneNumber
    ) {
      setStudents((prevStudents) => [...prevStudents, newStudent]);
      setNewStudent({ id: "", fullName: "", email: "", phoneNumber: "" }); // Clear input fields
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

  return (
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
            placeholder="Intern"
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
          <Label className="block text-gray-700 font-semibold mb-2">Dean</Label>
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
            placeholder="Enter recipient (e.g., Dear Dr. Smith)"
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

      <Button
        onClick={handleAddStudent}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Student
      </Button>

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
            {students.map((student, index) => (
              <tr key={index} className="bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {student.id}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {student.fullName}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {student.email}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-sm text-gray-700">
                  {student.phoneNumber}
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
        <PDFDownloadLink document={callEndorsementLetter()} fileName={fileName}>
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
      </div>
    </div>
  );
};

export default ManualCreateEndorsementLetterPage;
