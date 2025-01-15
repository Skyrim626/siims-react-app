import React from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Button, Select } from "@headlessui/react";
import Text from "../common/Text";
import { loginInfo } from "../../formDefaults/loginInfo";
import { personalInfo } from "../../formDefaults/personalInfo";
import { addressInfo } from "../../formDefaults/addressInfo";

const DeanForm = ({
  colleges = [],
  method = "post",

  deanInfo = {
    ...loginInfo,
    ...personalInfo,
    ...addressInfo,
    college_id: "",
  },
  handleDeanInfoChange,
  handleSubmit = () => console.log("Testing"),
  requiredFields = {
    id: true,
    password: true,
    first_name: true,
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
  errors = {},
}) => {
  return (
    <>
      <form className="space-y-3" onSubmit={handleSubmit}>
        {method !== "put" && (
          <LoginInfoFields
            info={deanInfo}
            handleInfoChange={handleDeanInfoChange}
            requiredFields={requiredFields}
            errors={errors}
          />
        )}

        <PersonalInfoFields
          personalInfo={deanInfo}
          handlePersonalInfoChange={handleDeanInfoChange}
          requiredFields={requiredFields}
          errors={errors}
        />

        <AddressInfoFields
          addressInfo={deanInfo}
          handleAddressInfoChange={handleDeanInfoChange}
          errors={errors}
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
              <div>
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
                    value={deanInfo.college_id}
                    required={requiredFields["college_id"]}
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
                {errors.college_id && (
                  <Text className="text-red-500">{errors.college_id[0]}</Text>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DeanForm;
