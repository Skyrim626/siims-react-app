import React from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Select } from "@headlessui/react";

const InternForm = ({
  isFormModal = true,
  method = "post",
  internInfo = {
    id: "",
    job_title: "",
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
    company_id: "",
  },
  handleInternInfoChange = () => console.log("Testing"),
  companies = [],
  handleSubmit = () => console.log("Testing Submit"),
  requiredFields = {
    id: true,
    job_title: true,
    first_name: true,
    middle_name: false,
    last_name: true,
    email: true,
    gender: false,
    phone_number: false,
    street: false,
    barangay: false,
    city_municipality: false,
    province: false,
    postal_code: false,
    company_id: true,
  },
  displayFields = {
    id: true,
    job_title: true,
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
    company_id: true,
  },
}) => {
  // Determine button text based on method
  const buttonTitle = () => {
    switch (method) {
      case "post":
        return "Add Intern";

      case "put":
        return "Save Changes";

      default:
        return "Add Intern";
    }
  };

  return (
    <>
      <div>
        <Heading
          level={5}
          color="black"
          text={"Company Assignment"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"Assign Company"}
              name={"company_id"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["company_id"]}
            >
              <Select
                name="company_id"
                className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                aria-label="Select a company"
                onChange={handleInternInfoChange}
                required={requiredFields["company_id"]}
                value={internInfo.company_id}
              >
                <option value="">-Select a Company-</option>
                {companies.map((company) => {
                  return (
                    <option
                      key={company.id}
                      value={company.id}
                      className="text-blue-700 font-bold"
                    >
                      {company.name}
                    </option>
                  );
                })}
              </Select>
            </FormField>
          </div>
        </div>
      </div>

      <LoginInfoFields
        info={internInfo}
        handleInfoChange={handleInternInfoChange}
        requiredFields={requiredFields}
      />

      <PersonalInfoFields
        personalInfo={internInfo}
        handlePersonalInfoChange={handleInternInfoChange}
        requiredFields={requiredFields}
      />

      <AddressInfoFields
        addressInfo={internInfo}
        handleAddressInfoChange={handleInternInfoChange}
      />
    </>
  );
};

export default InternForm;
