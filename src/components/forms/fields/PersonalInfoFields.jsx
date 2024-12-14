import React from "react";
import Heading from "../../common/Heading";
import { Input, Select } from "@headlessui/react";
import FormField from "../../common/FormField";
import Text from "../../common/Text";

const PersonalInfoFields = ({
  personalInfo = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
  },
  handlePersonalInfoChange,
  requiredFields = {
    first_name: false,
    middle_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    gender: false,
  },
  errors = {},
}) => {
  return (
    <>
      {/* Personal Information */}
      <div>
        <Heading
          level={5}
          color="black"
          text={"Personal Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            {/* First Name Field */}
            <div>
              <FormField
                label={"First Name"}
                name={"firstName"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["first_name"]}
              >
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="firstName"
                  onChange={handlePersonalInfoChange}
                  placeholder="First name"
                  value={personalInfo.firstName}
                  required={requiredFields["first_name"]}
                />
              </FormField>
              {errors.first_name && (
                <Text className="text-red-500">{errors.first_name[0]}</Text>
              )}
            </div>

            {/* Middle Name Field */}
            <div>
              <FormField
                label={"Middle Name"}
                name={"middleName"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["middle_name"]}
              >
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="middleName"
                  onChange={handlePersonalInfoChange}
                  placeholder="Middle name"
                  value={personalInfo.middleName}
                  required={requiredFields["middle_name"]}
                />
              </FormField>
              {errors.middle_name && (
                <Text className="text-red-500">{errors.middle_name[0]}</Text>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <FormField
                label={"Last Name"}
                name={"lastName"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["last_name"]}
              >
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="lastName"
                  onChange={handlePersonalInfoChange}
                  placeholder="Last name"
                  value={personalInfo.lastName}
                  required={requiredFields["last_name"]}
                />
              </FormField>
              {errors.last_name && (
                <Text className="text-red-500">{errors.last_name[0]}</Text>
              )}
            </div>

            {/* Email Field */}
            <div>
              <FormField
                label={"Email"}
                name={"email"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["email"]}
              >
                <Input
                  type="email"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="email"
                  onChange={handlePersonalInfoChange}
                  placeholder="Email"
                  value={personalInfo.email}
                  required={requiredFields["email"]}
                />
              </FormField>
              {errors.email && (
                <Text className="text-red-500">{errors.email[0]}</Text>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <FormField
                label={"Gender"}
                name={"gender"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["gender"]}
              >
                <Select
                  name="gender"
                  className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
                  aria-label="Select gender"
                  onChange={handlePersonalInfoChange}
                  required={requiredFields["gender"]}
                  value={personalInfo.gender}
                >
                  <option value="">-Select a Gender-</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormField>
              {errors.gender && (
                <Text className="text-red-500">{errors.gender[0]}</Text>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <FormField
                label={"Phone Number"}
                name={"phoneNumber"}
                labelClassName="text-sm text-black font-semibold"
                required={requiredFields["phone_number"]}
              >
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="phoneNumber"
                  onChange={handlePersonalInfoChange}
                  placeholder="Phone Number"
                  value={personalInfo.phoneNumber}
                  required={requiredFields["phone_number"]}
                />
              </FormField>
              {errors.phone_number && (
                <Text className="text-red-500">{errors.phone_number[0]}</Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoFields;
