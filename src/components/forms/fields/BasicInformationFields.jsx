import React from "react";
import Heading from "../../common/Heading";
import FormField from "../../common/FormField";
import { Input } from "@headlessui/react";
import Text from "../../common/Text";

const BasicInformationFields = ({
  // Input State
  firstName = "",
  middleName = "",
  lastName = "",
  email = "",
  phoneNumber = "",

  // Set State
  setFirstName = () => {},
  setMiddleName = () => {},
  setLastName = () => {},
  setEmail = () => {},
  setPhoneNumber = () => {},

  // Required Fields
  requiredFields = {
    firstName: false,
    middleName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  },

  // Errors State
  errors = {},
}) => {
  return (
    <>
      {/* Basic Information */}
      <div className="mt-6">
        <Heading
          level={5}
          color="black"
          text={"Personal Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          <FormField
            label={"First name"}
            name={"firstName"}
            labelClassName="text-sm text-black font-semibold"
            required={requiredFields.firstName}
          >
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="firstName"
              placeholder="First name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required={requiredFields.firstName}
            />
            {errors.first_name && (
              <Text className="text-red-600 font-bold italic">
                {errors.first_name}
              </Text>
            )}
          </FormField>

          <FormField
            label={"Middle name"}
            name={"middleName"}
            labelClassName="text-sm text-black font-semibold"
            required={requiredFields.middleName}
          >
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="middleName"
              placeholder="Middle name"
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
              required={requiredFields.middleName}
            />
            {errors.middle_name && (
              <Text className="text-red-600 font-bold italic">
                {errors.middle_name}
              </Text>
            )}
          </FormField>

          <FormField
            label={"Last name"}
            name={"lastName"}
            labelClassName="text-sm text-black font-semibold"
            required={requiredFields.lastName}
          >
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="lastName"
              placeholder="Last name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            {errors.last_name && (
              <Text className="text-red-600 font-bold italic">
                {errors.last_name}
              </Text>
            )}
          </FormField>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <FormField
            label={"Email"}
            name={"email"}
            labelClassName="text-sm text-black font-semibold"
            required={requiredFields.email}
          >
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email && (
              <Text className="text-red-600 font-bold italic">
                {errors.email}
              </Text>
            )}
          </FormField>
          <FormField
            label={"Phone number"}
            name={"phoneNumber"}
            labelClassName="text-sm text-black font-semibold"
          >
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="phoneNumber"
              placeholder="Phone number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            {errors.phone_number && (
              <Text className="text-red-600 font-bold italic">
                {errors.phone_number}
              </Text>
            )}
          </FormField>
        </div>
      </div>
    </>
  );
};

export default BasicInformationFields;
