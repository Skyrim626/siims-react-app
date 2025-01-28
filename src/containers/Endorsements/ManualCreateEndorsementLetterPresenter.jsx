import React from "react";
import EndorseStudentModalContainer from "./components/modals/EndorseStudentModalContainer";
import { Button, Field, Input, Label, Select } from "@headlessui/react";
import TypeWrapper from "./components/TypeWrapper";
import SearchCompanyModalContainer from "./components/modals/SearchCompanyModalContainer";
import SearchCoordinatorModalContainer from "./components/modals/SearchCoordinatorModalContainer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Loader from "../../components/common/Loader";
import RoleBasedView from "../../components/common/RoleBasedView";
import RecepientPositionDropDown from "./components/RecepientPositionDropDown";
import ConfirmGenerateModal from "./components/modals/ConfirmGenerateModal";

const ManualCreateEndorsementLetterPresenter = ({
  authorizeRole,
  loading,
  type = "manual",

  viewPdf,
  handlePrintAndSend,

  // Form Data
  formData,

  handleInputChange,

  newStudent = {},
  handleStudentInputChange,

  // Student Modal Props
  handleAddStudent,
  handleRemoveStudent,
  setNewStudent,
  isStudentModalOpen,
  setIsStudentModalOpen,

  // Coordinator Modal Props
  isSearchCompanyModalOpen,
  isSearchCoordinatorModalOpen,
  setOjtCoordinatorMail,
  setIsSearchCoordinatorModalOpen,
  setIsSearchCompanyModalOpen,

  callEndorsementLetter,

  /* Confirmation Modal */
  studentsNotAttended = [],
  isConfirmationModalOpen,
  setIsConfirmationModalOpen,
  handleConfirm,
}) => {
  return (
    <div>
      <Loader loading={loading} />

      {isSearchCompanyModalOpen && (
        <SearchCompanyModalContainer
          setIsModalOpen={setIsSearchCompanyModalOpen}
        />
      )}

      {isSearchCoordinatorModalOpen && (
        <SearchCoordinatorModalContainer
          setIsModalOpen={setIsSearchCoordinatorModalOpen}
        />
      )}

      {isStudentModalOpen && (
        <EndorseStudentModalContainer
          setNewStudent={setNewStudent}
          setIsStudentModalOpen={setIsStudentModalOpen}
        />
      )}

      {isConfirmationModalOpen && (
        <ConfirmGenerateModal
          open={isConfirmationModalOpen}
          setOpen={setIsConfirmationModalOpen}
          studentsNotAttended={studentsNotAttended}
          handleConfirm={handleConfirm}
        />
      )}

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h1 className="text-2xl font-bold mb-4">Generate Endorsement Letter</h1>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">Date</Label>
          <Input
            name="current_date"
            type="text"
            value={formData.current_date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Enter Date"
          />
        </Field>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Greeting Message
          </Label>
          <Input
            name={"greeting_message"}
            type="text"
            value={formData.greeting_message}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Dear Mr.John Doe"
          />
        </Field>

        <div className="grid grid-cols-3 gap-3 items-center">
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Recipient Name
            </Label>

            <Input
              name={"recipient_name"}
              type="text"
              value={formData.recipient_name}
              onChange={handleInputChange}
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
              name={"recipient_position"}
              value={formData.recipient_position}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Recipient Position"
            />
          </Field>

          <RecepientPositionDropDown
            state={formData.recipient_position}
            handleInputChange={handleInputChange}
          />
        </div>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Company
          </Label>
          <Input
            type="text"
            name={"company_name"}
            value={formData.company_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
            placeholder="Company XYZ"
          />
        </Field>

        <div className="flex justify-center items-center">
          <TypeWrapper type={type} requiredType={"manual"}>
            <Button
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-transform transform hover:bg-blue-600 focus:ring focus:outline-none focus:ring-blue-300 active:scale-95"
              onClick={() =>
                setIsSearchCompanyModalOpen(!isSearchCompanyModalOpen)
              }
            >
              Search Company
            </Button>
          </TypeWrapper>
        </div>

        <Field className="mb-6">
          <Label className="block text-gray-700 font-semibold mb-2">
            Address
          </Label>
          <Input
            type="text"
            name="company_address"
            value={formData.company_address}
            onChange={handleInputChange}
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
              name="chairperson_full_name"
              value={formData.chairperson_full_name}
              onChange={handleInputChange}
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
              name={"dean_full_name"}
              value={formData.dean_full_name}
              onChange={handleInputChange}
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
              name="ojt_coordinator_full_name"
              value={formData.ojt_coordinator_full_name}
              onChange={handleInputChange}
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
              name="ojt_coordinator_email"
              value={formData.ojt_coordinator_email}
              onChange={handleInputChange}
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
              value={formData.dean_office_number}
              onChange={handleInputChange}
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
              value={formData.local_number}
              onChange={handleInputChange}
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
              value={formData.college}
              onChange={handleInputChange}
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
              value={formData.program}
              onChange={handleInputChange}
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
            onChange={handleStudentInputChange}
            placeholder="Student ID"
            className="px-4 py-2 border rounded-md"
          />
          <Input
            type="text"
            name="fullName"
            value={newStudent.fullName}
            onChange={handleStudentInputChange}
            placeholder="Full Name"
            className="px-4 py-2 border rounded-md"
          />
          <Input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleStudentInputChange}
            placeholder="Email"
            className="px-4 py-2 border rounded-md"
          />
          <Input
            type="text"
            name="phoneNumber"
            value={newStudent.phoneNumber}
            onChange={handleStudentInputChange}
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
            onClick={() => setIsStudentModalOpen(!isStudentModalOpen)}
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
              {formData.students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No students added.
                  </td>
                </tr>
              ) : (
                formData.students.map((student, index) => (
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
                      <Button
                        onClick={() => handleRemoveStudent(student.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {formData.students && formData.students.length > 0 && (
          <Field className="mb-6">
            <Label className="block text-gray-700 font-semibold mb-2">
              Requested by (Student ID)
            </Label>
            <Input
              type="text"
              name="requested_by_id"
              value={formData.requested_by_id}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow focus:ring focus:outline-none"
              placeholder="Enter requested student ID"
              required
            />
          </Field>
        )}

        <div className="flex justify-end space-x-5">
          <RoleBasedView
            roles={["admin", "chairperson", "student"]}
            authorizeRole={authorizeRole}
          >
            <div className="hidden">
              <PDFDownloadLink
                document={callEndorsementLetter(formData)}
                fileName={formData.file_name}
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
            </div>
          </RoleBasedView>

          {/* <Button
            onClick={() => setIsOpenSignatureModal(!isOpenSignatureModal)}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Signature
          </Button> */}
          {/* <RoleBasedView
            roles={["admin", "chairperson"]}
            authorizeRole={authorizeRole}
          >
            <Button
              onClick={() => viewPdf(formData)}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              View PDF
            </Button>
          </RoleBasedView> */}

          <RoleBasedView
            roles={["admin", "chairperson"]}
            authorizeRole={authorizeRole}
          >
            <Button
              onClick={handlePrintAndSend}
              className={`text-white px-4 py-2 rounded-md shadow ${
                formData.ojt_coordinator_full_name === "" &&
                formData.students.length === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={
                formData.ojt_coordinator_full_name === "" &&
                formData.students.length === 0
              }
            >
              Send and Print
            </Button>
          </RoleBasedView>

          <RoleBasedView roles={["student"]} authorizeRole={authorizeRole}>
            <Button className="px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold">
              Send
            </Button>
          </RoleBasedView>
        </div>
      </div>
    </div>
  );
};

export default ManualCreateEndorsementLetterPresenter;
