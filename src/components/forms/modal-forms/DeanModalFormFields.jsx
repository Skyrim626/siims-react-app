import React from "react";
import { Button, Select } from "@headlessui/react";
import LoginInfoFields from "../fields/LoginInfoFields";
import PersonalInfoFields from "../fields/PersonalInfoFields";
import AddressInfoFields from "../fields/AddressInfoFields";
import Heading from "../../common/Heading";
import FormField from "../../common/FormField";

const DeanModalFormFields = ({
  colleges = [],
  method = "post",
  deanInfo = {
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
    college_id: "",
  },
  handleDeanInfoChange,
  handleSubmit = () => console.log("Testing"),
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
    college_id: true,
  },
}) => {
  return (
    <>
      {method === "post" && (
        <LoginInfoFields
          info={deanInfo}
          handleInfoChange={handleDeanInfoChange}
          requiredFields={requiredFields}
        />
      )}

      <PersonalInfoFields
        personalInfo={deanInfo}
        handlePersonalInfoChange={handleDeanInfoChange}
        requiredFields={requiredFields}
      />

      <AddressInfoFields
        addressInfo={deanInfo}
        handleAddressInfoChange={handleDeanInfoChange}
      />

      <div>
        <Heading
          level={5}
          color="black"
          text={"Dean Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"College"}
              name={"college_id"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["college_id"]}
            >
              <Select
                name="college_id"
                className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                aria-label="Select college"
                onChange={handleDeanInfoChange}
                required={requiredFields["college_id"]}
                value={deanInfo.college_id}
              >
                <option value="">-Select a College-</option>
                {colleges.map((college) => {
                  return (
                    <option
                      key={college.id}
                      value={college.id}
                      className={`${
                        college.dean_id &&
                        "text-blue-700 font-bold cursor-not-allowed"
                      }`}
                      disabled={college.dean_id}
                    >
                      {college.dean_id
                        ? `Occupied | ${college.name}`
                        : college.name}
                    </option>
                  );
                })}
              </Select>
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeanModalFormFields;
