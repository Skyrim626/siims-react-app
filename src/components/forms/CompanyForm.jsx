import React from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Input } from "@headlessui/react";
import Text from "../common/Text";

const CompanyForm = ({
  method = "post",
  companyInfo = {
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

    // Company
    companyName: "",
    websiteURL: "",
  },
  handleCompanyInfoChange,
  requiredFields = {
    id: true,
    password: true,
    first_name: true,
    middleName: false,
    lastName: false,
    phoneNumber: true,
    email: true,
    gender: false,
    street: false,
    barangay: false,
    cityMunicipality: false,
    province: false,
    postalCode: false,
    companyName: true,
    websiteURL: false,
  },
  errors = {},
}) => {
  return (
    <>
      <form className="space-y-3">
        {method !== "put" && (
          <LoginInfoFields
            info={companyInfo}
            handleInfoChange={handleCompanyInfoChange}
            requiredFields={requiredFields}
            errors={errors}
          />
        )}

        <PersonalInfoFields
          personalInfo={companyInfo}
          handlePersonalInfoChange={handleCompanyInfoChange}
          requiredFields={requiredFields}
          errors={errors}
        />

        <AddressInfoFields
          addressInfo={companyInfo}
          handleAddressInfoChange={handleCompanyInfoChange}
          errors={errors}
        />

        {/* Company Info Fields */}
        <div>
          <Heading
            level={5}
            color="black"
            text={"Company Information"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />

          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-2 mt-4">
              {/* Company Field */}
              <div>
                <FormField
                  label={"Company Name"}
                  name={"companyName"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["companyName"]}
                >
                  <Input
                    type="text"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="companyName"
                    onChange={handleCompanyInfoChange}
                    placeholder="Company name"
                    value={companyInfo.companyName}
                    required={requiredFields["companyName"]}
                  />
                </FormField>
                {errors.company_name && (
                  <Text className="text-red-500">{errors.company_name[0]}</Text>
                )}
              </div>

              {/* Website URL Field */}
              <div>
                <FormField
                  label={"Website URL (https://your-website)"}
                  name={"websiteURL"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["websiteURL"]}
                >
                  <Input
                    type="text"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="websiteURL"
                    onChange={handleCompanyInfoChange}
                    placeholder="Web URL"
                    value={companyInfo.websiteURL}
                    required={requiredFields["websiteURL"]}
                  />
                </FormField>
                {errors.website_url && (
                  <Text className="text-red-500">{errors.website_url[0]}</Text>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CompanyForm;
