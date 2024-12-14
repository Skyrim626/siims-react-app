import React from "react";
import LoginFields from "../fields/LoginFields";
import BasicInformationFields from "./fields/BasicInformationFields";
import Heading from "../common/Heading";
import { Input, Select, Switch } from "@headlessui/react";
import FormField from "../common/FormField";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Text from "../common/Text";

const ChairpersonForm = ({
  method = "post",
  chairpersonInfo = {
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
    programId: "",
    allowCoordinator: false,
  },
  handleChairpersonInfoChange,
  handleSubmit = () => console.log("Testing"),
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
    allow_coordinator: false,
    program_id: false,
  },
  programs = [],
  errors = {},
}) => {
  return (
    <>
      <form className="space-y-3">
        {method !== "put" && (
          <LoginInfoFields
            info={chairpersonInfo}
            handleInfoChange={handleChairpersonInfoChange}
            requiredFields={requiredFields}
            errors={errors}
          />
        )}

        <PersonalInfoFields
          personalInfo={chairpersonInfo}
          handlePersonalInfoChange={handleChairpersonInfoChange}
          requiredFields={requiredFields}
          errors={errors}
        />

        <AddressInfoFields
          addressInfo={chairpersonInfo}
          handleAddressInfoChange={handleChairpersonInfoChange}
          errors={errors}
        />

        {/* Chairperson Information: Display if method is POST */}
        {method === "post" && (
          <div>
            <Heading
              level={5}
              color="black"
              text={"Chairperson Information"}
              className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
            />
            <div className="flex flex-col">
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="flex items-center space-x-3">
                  <Input
                    type="checkbox"
                    name="allowCoordinator"
                    checked={chairpersonInfo.allowCoordinator}
                    onChange={handleChairpersonInfoChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Text className="text-sm font-bold">Allow Coordinator</Text>
                </div>

                {/* Chairperson Program Assign */}
                <div>
                  <FormField
                    label={"Program Assign"}
                    name={"programId"}
                    labelClassName="text-sm text-black font-semibold"
                    required={requiredFields["program_id"]}
                  >
                    <Select
                      name="programId"
                      className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                      aria-label="Select program"
                      onChange={handleChairpersonInfoChange}
                      value={chairpersonInfo.programId}
                      required={requiredFields["program_id"]}
                    >
                      <option value="">-Select a Program-</option>
                      {programs.map((program) => {
                        return (
                          <option
                            key={program.id}
                            value={program.id}
                            className={`${
                              program.chairperson_id &&
                              "text-blue-700 font-bold cursor-not-allowed"
                            }`}
                            disabled={program.chairperson_id}
                          >
                            {program.chairperson_id
                              ? `Occupied | ${program.name}`
                              : program.name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormField>
                  {errors.program_id && (
                    <Text className="text-red-500">{errors.program_id[0]}</Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default ChairpersonForm;
