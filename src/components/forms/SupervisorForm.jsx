import React from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Select } from "@headlessui/react";
import Text from "../common/Text";

const SupervisorForm = ({
  role = "",
  isFormModal = true,
  method = "post",
  supervisorInfo = {
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
    officeID: "",
  },
  handleSupervisorInfoChange = () => console.log("Testing"),
  handleSubmit = () => console.log("Testing Submit"),
  requiredFields = {
    id: true,
    password: true,
    firstName: false,
    middleName: false,
    lastName: false,
    email: true,
    gender: false,
    phoneNumber: false,
    street: false,
    barangay: false,
    cityMunicipality: false,
    province: false,
    postalCode: false,
    officeID: true,
  },
  displayFields = {
    id: true,
    password: true,
    firstName: true,
    middleName: true,
    lastName: true,
    email: true,
    gender: true,
    phoneNumber: true,
    street: true,
    barangay: true,
    cityMunicipality: true,
    province: true,
    postalCode: true,
    officeID: true,
  },
  offices = [],
  errors = {},
}) => {
  // Method Checker
  const buttonTitle = () => {
    switch (method) {
      case "post":
        return "Add Supervisor";

      case "put":
        return "Save Changes";

      default:
        return "Add Supervisor";
    }
  };

  return (
    <>
      {method !== "put" && (
        <LoginInfoFields
          info={supervisorInfo}
          handleInfoChange={handleSupervisorInfoChange}
          requiredFields={requiredFields}
        />
      )}

      <PersonalInfoFields
        personalInfo={supervisorInfo}
        handlePersonalInfoChange={handleSupervisorInfoChange}
        requiredFields={requiredFields}
      />

      <AddressInfoFields
        addressInfo={supervisorInfo}
        handleAddressInfoChange={handleSupervisorInfoChange}
      />

      {/* Office Information */}
      <div>
        <Heading
          level={5}
          color="black"
          text={"Office Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div>
              <FormField
                label={"Office Assign"}
                name={"officeID"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["officeID"]}
              >
                <Select
                  name="officeID"
                  className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                  aria-label="Select college"
                  onChange={handleSupervisorInfoChange}
                  required={requiredFields["officeID"]}
                  value={supervisorInfo.officeID}
                >
                  <option value="">-Select an Office-</option>
                  {offices.map((office) => {
                    return (
                      <option
                        key={office.id}
                        value={office.id}
                        className={`${
                          office.supervisor_name &&
                          "text-blue-700 font-bold cursor-not-allowed"
                        }`}
                        //  disabled={office.supervisor_name}
                      >
                        {office.supervisor_name
                          ? `${office.name} | Occupied by: ${office.supervisor_name} `
                          : office.name}
                      </option>
                    );
                  })}
                </Select>
              </FormField>
              {errors.office_id && (
                <Text className="text-red-500">{errors.office_id[0]}</Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorForm;
