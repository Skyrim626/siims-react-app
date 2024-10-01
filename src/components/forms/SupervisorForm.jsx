import React from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Select } from "@headlessui/react";

const SupervisorForm = ({
  isFormModal = true,
  method = "post",
  supervisorInfo = {
    id: "",
    password: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone_number: "",
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    postal_code: "",
    office_id: "",
  },
  handleSupervisorInfoChange = () => console.log("Testing"),
  offices = [],
  handleSubmit = () => console.log("Testing Submit"),
  requiredFields = {
    id: true,
    password: true,
    first_name: false,
    middle_name: false,
    last_name: false,
    email: true,
    gender: false,
    phone_number: false,
    street: false,
    barangay: false,
    city_municipality: false,
    province: false,
    postal_code: false,
    office_id: true,
  },
  displayFields = {
    id: true,
    password: true,
    first_name: true,
    middle_name: true,
    last_name: true,
    email: true,
    gender: true,
    phone_number: true,
    street: true,
    barangay: true,
    city_municipality: true,
    province: true,
    postal_code: true,
    office_id: true,
  },
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
      <div>
        <Heading
          level={5}
          color="black"
          text={"Office Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"Office Assign"}
              name={"office_id"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["office_id"]}
            >
              <Select
                name="office_id"
                className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                aria-label="Select college"
                onChange={handleSupervisorInfoChange}
                required={requiredFields["office_id"]}
                value={supervisorInfo.office_id}
              >
                <option value="">-Select an Office-</option>
                {offices.map((office) => {
                  return (
                    <option
                      key={office.id}
                      value={office.id}
                      className={`${
                        office.supervisor_id &&
                        "text-blue-700 font-bold cursor-not-allowed"
                      }`}
                      disabled={office.supervisor_id}
                    >
                      {office.supervisor_id
                        ? `Occupied | ${office.name}`
                        : office.name}
                    </option>
                  );
                })}
              </Select>
            </FormField>
          </div>
        </div>
      </div>

      <LoginInfoFields
        info={supervisorInfo}
        handleInfoChange={handleSupervisorInfoChange}
        requiredFields={requiredFields}
      />

      <PersonalInfoFields
        personalInfo={supervisorInfo}
        handlePersonalInfoChange={handleSupervisorInfoChange}
        requiredFields={requiredFields}
      />

      <AddressInfoFields
        addressInfo={supervisorInfo}
        handleAddressInfoChange={handleSupervisorInfoChange}
      />
    </>
  );
};

export default SupervisorForm;
