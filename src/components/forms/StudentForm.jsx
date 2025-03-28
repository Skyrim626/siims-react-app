import React, { useEffect } from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Input, Select } from "@headlessui/react";
import Text from "../common/Text";
import { loginInfo } from "../../formDefaults/loginInfo";
import { addressInfo } from "../../formDefaults/addressInfo";

const StudentForm = ({
  authorizeRole,
  method = "post",
  studentInfo = {
    ...loginInfo,
    ...personalInfo,
    ...addressInfo,

    // Student unique fields
    age: "",
    date_of_birth: "",
    program_id: "",
    coordinator_id: "",
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
    phone_numbers: false,
    street: false,
    barangay: false,
    city_municipality: false,
    province: false,
    postal_code: false,

    // Student unique fields
    age: false,
    date_of_birth: false,
    program_id: true,
    coordinator_id: false,
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
            text={"Student Information"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />

          <div className="flex flex-col">
            {/* Date of Birth and Age Field */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {/* Date of Birth Field */}
              <div>
                <FormField
                  label={"Date of Birth"}
                  name={"date_of_birth"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["date_of_birth"]}
                >
                  <Input
                    type="date"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="date_of_birth"
                    onChange={handleStudentInfoChange}
                    placeholder="Date of Birth"
                    value={studentInfo.date_of_birth}
                    required={requiredFields["date_of_birth"]}
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
                    name={"program_id"}
                    labelClassName="text-sm text-black font-semibold"
                    required={requiredFields["program_id"]}
                  >
                    <Select
                      name="program_id"
                      className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                      aria-label="Select program"
                      onChange={handleStudentInfoChange}
                      value={studentInfo.program_id}
                      required={requiredFields["program_id"]}
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
                  name={"coordinator_id"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["coordinator_id"]}
                >
                  <Select
                    name="coordinator_id"
                    className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                    aria-label="Select coordinator"
                    onChange={handleStudentInfoChange}
                    value={studentInfo.coordinator_id}
                    required={requiredFields["coordinator_id"]}
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
