import React, { useEffect } from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Input, Select } from "@headlessui/react";
import Text from "../common/Text";

const StudentForm = ({
  authorizeRole,
  method = "post",
  studentInfo = {
    id: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    street: "",
    barangay: "",
    cityMunicipality: "",
    province: "",
    postalCode: "",

    // Student unique fields
    age: "",
    dateOfBirth: "",
    programID: "",
    coordinatorID: "",
  },
  handleStudentInfoChange,
  requiredFields = {
    id: true,
    password: true,
    first_name: true,
    middle_name: false,
    last_name: false,
    phone_number: false,
    email: true,
    gender: false,
    phoneNumber: false,
    street: false,
    barangay: false,
    cityMunicipality: false,
    province: false,
    postalCode: false,

    // Student unique fields
    age: false,
    dateOfBirth: false,
    programID: true,
    coordinatorID: false,
  },
  programs = [],
  coordinators = [],
  errors = {},
}) => {
  return (
    <>
      <div className="space-y-3">
        {method !== "put" && (
          <LoginInfoFields
            info={studentInfo}
            handleInfoChange={handleStudentInfoChange}
            requiredFields={requiredFields}
            errors={errors}
          />
        )}

        <PersonalInfoFields
          personalInfo={studentInfo}
          handlePersonalInfoChange={handleStudentInfoChange}
          requiredFields={requiredFields}
          errors={errors}
        />

        <AddressInfoFields
          addressInfo={studentInfo}
          handleAddressInfoChange={handleStudentInfoChange}
          errors={errors}
        />

        <div>
          <Heading
            level={5}
            color="black"
            text={"Student Indivation"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />

          <div className="flex flex-col">
            {/* Date of Birth and Age Field */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {/* Date of Birth Field */}
              <div>
                <FormField
                  label={"Date of Birth"}
                  name={"dateOfBirth"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["dateOfBirth"]}
                >
                  <Input
                    type="date"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="dateOfBirth"
                    onChange={handleStudentInfoChange}
                    placeholder="Date of Birth"
                    value={studentInfo.dateOfBirth}
                    required={requiredFields["dateOfBirth"]}
                  />
                </FormField>
                {errors.date_of_birth && (
                  <Text className="text-red-500">
                    {errors.date_of_birth[0]}
                  </Text>
                )}
              </div>

              {/* Age Field */}
              <div>
                <FormField
                  label={"Age"}
                  name={"age"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["age"]}
                >
                  <Input
                    type="number"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="age"
                    onChange={handleStudentInfoChange}
                    placeholder="Age"
                    value={studentInfo.age}
                    required={requiredFields["age"]}
                  />
                </FormField>
                {errors.age && (
                  <Text className="text-red-500">{errors.age[0]}</Text>
                )}
              </div>
            </div>

            {/* Program and Coordinator Assign */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {/* Student Program Assign */}
              {!(authorizeRole === "chairperson") && (
                <div>
                  <FormField
                    label={"Program Assign"}
                    name={"programID"}
                    labelClassName="text-sm text-black font-semibold"
                    required={requiredFields["programID"]}
                  >
                    <Select
                      name="programID"
                      className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                      aria-label="Select program"
                      onChange={handleStudentInfoChange}
                      value={studentInfo.programID}
                      required={requiredFields["programID"]}
                    >
                      <option value="">-Select a Program-</option>
                      {programs.map((program) => {
                        return (
                          <option key={program.id} value={program.id}>
                            {program.name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormField>
                  {errors.program_id && (
                    <Text className="text-red-500">{errors.program_id[0]}</Text>
                  )}
                </div>
              )}

              {/* Student Coordinator Assign */}
              <div>
                <FormField
                  label={"Coordinator Assign"}
                  name={"coordinatorID"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["coordinatorID"]}
                >
                  <Select
                    name="coordinatorID"
                    className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                    aria-label="Select coordinator"
                    onChange={handleStudentInfoChange}
                    value={studentInfo.coordinatorID}
                    required={requiredFields["coordinatorID"]}
                  >
                    <option value="">-Select a Coordinator-</option>
                    {coordinators.map((coordinator) => {
                      return (
                        <option key={coordinator.id} value={coordinator.id}>
                          {coordinator.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormField>
                {errors.coordinator_id && (
                  <Text className="text-red-500">
                    {errors.coordinator_id[0]}
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentForm;
