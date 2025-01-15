import React from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import { Input } from "@headlessui/react";
import Text from "../common/Text";
import { personalInfo } from "../../formDefaults/personalInfo";
import { companyInfo } from "../../formDefaults/companyInfo";
import { loginInfo } from "../../formDefaults/loginInfo";
import { addressInfo } from "../../formDefaults/addressInfo";

const CompanyForm = ({
  method = "post",
  formData = {
    ...loginInfo,
    ...personalInfo,
    ...addressInfo,
    ...companyInfo,
  },
  handleCompanyInfoChange,
  requiredFields = {
    id: true,
    password: true,
    first_name: true,
    middle_name: false,
    last_name: false,
    phone_number: true,
    email: true,
    gender: false,
    street: false,
    barangay: false,
    city_municipality: false,
    province: false,
    postal_code: false,
    name: true,
    website_url: false,
  },
  errors = {},
}) => {
  // console.log(formData);

  return (
    <>
      <form className="space-y-3">
        {method !== "put" && (
          <LoginInfoFields
            info={formData}
            handleInfoChange={handleCompanyInfoChange}
            requiredFields={requiredFields}
            errors={errors}
          />
        )}

        <PersonalInfoFields
          personalInfo={formData}
          handlePersonalInfoChange={handleCompanyInfoChange}
          requiredFields={requiredFields}
          errors={errors}
        />

        <AddressInfoFields
          addressInfo={formData}
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
                  name={"name"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["name"]}
                >
                  <Input
                    type="text"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="name"
                    onChange={handleCompanyInfoChange}
                    placeholder="Company name"
                    value={formData.name}
                    required={requiredFields["name"]}
                  />
                </FormField>
                {errors.name && (
                  <Text className="text-red-500">{errors.name[0]}</Text>
                )}
              </div>

              {/* Website URL Field */}
              <div>
                <FormField
                  label={"Website URL (https://your-website)"}
                  name={"website_url"}
                  labelClassName="text-sm text-black font-semibold"
                  required={requiredFields["website_url"]}
                >
                  <Input
                    type="text"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="website_url"
                    onChange={handleCompanyInfoChange}
                    placeholder="Web URL"
                    value={formData.website_url}
                    required={requiredFields["website_url"]}
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
