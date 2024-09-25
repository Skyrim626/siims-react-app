import React from "react";
import Heading from "../../common/Heading";
import FormField from "../../common/FormField";
import { Input } from "@headlessui/react";

const CompanyInfoFields = ({
  companyInfo,
  handleCompanyInfoChange,
  requiredFields = {
    company_name: true,
    website_url: false,
  },
}) => {
  return (
    <>
      <div>
        <Heading
          level={5}
          color="black"
          text={"Company Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"Company Name"}
              name={"company_name"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["company_name"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="company_name"
                onChange={handleCompanyInfoChange}
                placeholder="CompanyName"
                value={companyInfo.company_name}
                required={requiredFields["company_name"]}
              />
            </FormField>
            <FormField
              label={"Website Url"}
              name={"website_url"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["website_url"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="website_url"
                onChange={handleCompanyInfoChange}
                placeholder="Website URL"
                value={companyInfo.website_url}
                required={requiredFields["website_url"]}
              />
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyInfoFields;
