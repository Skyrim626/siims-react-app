// Libraries
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

// Utilities
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Input, Label, Select } from "@headlessui/react";
import Text from "../common/Text";
import BasicInformationFields from "./fields/BasicInformationFields";
import CoordinatorInformationFields from "./fields/CoordinatorInformationFields";
import ChairpersonInformationFields from "./fields/ChairpersonInformationFields";

export default function UserFormAdd({
  // Input States
  firstName = "",
  middleName = "",
  lastName = "",
  email = "",
  phoneNumber = "",
  programId = 0,
  collegeId = 0,

  // Set States
  setFirstName = () => {},
  setMiddleName = () => {},
  setLastName = () => {},
  setEmail = () => {},
  setPhoneNumber = () => {},
  setProgramId = () => {},
  setCollegeId = () => {},

  // Required Fields State
  requiredFields = {
    firstName: true,
    middleName: false,
    lastName: false,
    email: true,
    phoneNumber: false,
    programId: true,
    collegeId: true,
  },

  // Error State
  errors = {},

  // Data for selections
  programs = [],
  colleges = [],
}) {
  // console.log(colleges); // Log the colleges array

  const [filteredPrograms, setFilteredPrograms] = useState(programs);
  const [filteredColleges, setFilteredColleges] = useState(colleges);

  // Filter programs based on selected college
  const handleCollegeChange = (e) => {
    const selectedCollegeId = e.target.value;
    setCollegeId(selectedCollegeId);

    // Filter programs based on collegeId
    const filtered = programs.filter(
      (program) => program.college_id === selectedCollegeId
    );
    setFilteredPrograms(filtered);
  };

  // Filter colleges based on selected program
  const handleProgramChange = (e) => {
    const selectedProgramId = e.target.value;
    setProgramId(selectedProgramId);

    // Find the related college for the selected program
    const relatedCollege = colleges.find(
      (college) =>
        college.id ===
        programs.find((program) => program.id === selectedProgramId)?.college_id
    );
    setFilteredColleges(relatedCollege ? [relatedCollege] : colleges);
  };

  useEffect(() => {
    // Set initial filtered programs when the collegeId changes
    if (collegeId) {
      const filtered = programs.filter(
        (program) => program.college_id === collegeId
      );
      setFilteredPrograms(filtered);
    }
  }, [collegeId, programs]);

  // State to track form fields and roles
  const [formData, setFormData] = useState({
    selectedRoles: [],
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle role selection
  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      selectedRoles: prev.selectedRoles.includes(role)
        ? prev.selectedRoles.filter((r) => r !== role)
        : [...prev.selectedRoles, role],
    }));
  };

  return (
    <div>
      <Heading
        level={4}
        color="black"
        text="Add User"
        className="border-l-4 rounded-lg border-blue-700 px-3"
      />
      {/* Role Selection */}
      <div className="mt-4">
        <Heading level={5} color="gray-700" text="Roles" />
        <div className="flex gap-3 mt-2">
          {[
            "Student",
            "Dean",
            "Chairperson",
            "Company",
            "Supervisor",
            "Coordinator",
            "OSA",
          ].map((role) => (
            <label key={role} className="flex items-center gap-2">
              <Input
                type="checkbox"
                value={role}
                checked={formData.selectedRoles.includes(role)}
                onChange={() => handleRoleChange(role)}
                className="rounded border-gray-300"
              />
              {role}
            </label>
          ))}
        </div>
      </div>
      {/* Basic Information */}
      <BasicInformationFields
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        email={email}
        phoneNumber={phoneNumber}
        setFirstName={setFirstName}
        setMiddleName={setMiddleName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPhoneNumber={setPhoneNumber}
      />
      {/* Chairperson Information */}
      {formData.selectedRoles.includes("Chairperson") && (
        <ChairpersonInformationFields
          collegeId={collegeId}
          setCollegeId={handleCollegeChange}
          errors={errors}
          colleges={filteredColleges}
        />
      )}
      {/* Coordinator Information */}
      {formData.selectedRoles.includes("Coordinator") && (
        <CoordinatorInformationFields
          programId={programId}
          setProgramId={handleProgramChange}
          errors={errors}
          programs={filteredPrograms}
        />
      )}
      {/* Conditional Inputs */}
      {formData.selectedRoles.includes("Student") && (
        <div className="mt-6">
          <Heading level={5} color="gray-700" text="Student Information" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField label="Student ID" name="studentId">
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="Student ID"
                className="outline-none text-black rounded-md p-3"
              />
            </FormField>
            <FormField label="Program" name="program">
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="mt-3 p-3 border rounded-md"
              >
                <option value="" disabled>
                  Select Program
                </option>
                {programOptions.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>
      )}
      {/* Chairperson Information */}
      {formData.selectedRoles.includes("Chairperson") && (
        <div className="mt-6">
          <Heading level={5} color="gray-700" text="Chairperson Information" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField label="Department" name="department">
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Department"
                className="outline-none text-black rounded-md p-3"
              />
            </FormField>
            <FormField label="Office Number" name="officeNumber">
              <input
                type="text"
                name="officeNumber"
                value={formData.officeNumber}
                onChange={handleInputChange}
                placeholder="Office Number"
                className="outline-none text-black rounded-md p-3"
              />
            </FormField>
          </div>
        </div>
      )}
      {/* Company Information */}
      {formData.selectedRoles.includes("Company") && (
        <div className="mt-6">
          <Heading level={5} color="gray-700" text="Company Information" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField label="Company Name" name="companyName">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="outline-none text-black rounded-md p-3"
              />
            </FormField>
            <FormField label="Company Address" name="companyAddress">
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                placeholder="Company Address"
                className="outline-none text-black rounded-md p-3"
              />
            </FormField>
          </div>
        </div>
      )}
    </div>
  );
}
