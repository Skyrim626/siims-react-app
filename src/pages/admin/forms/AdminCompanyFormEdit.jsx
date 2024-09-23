import React, { useState } from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input } from "@headlessui/react";
import IDPasswordInfoFields from "../../../components/forms/IDPasswordInfoFields";
import PersonalInfoFields from "../../../components/forms/PersonalInfoFields";
import AddressInfoFields from "../../../components/forms/AddressInfoFields";
import CompanyInfoFields from "../../../components/forms/CompanyInfoFields";

const AdminCompanyFormEdit = ({ companyInfo, handleCompanyInfoChange }) => {
  return (
    <>
      {/* Company Information Fields */}
      <div className="flex flex-col gap-3">
        {/* ID and Password Fields */}
        <IDPasswordInfoFields
          info={companyInfo}
          handleInfoChange={handleCompanyInfoChange}
          allowedFields={{
            id: true,
          }}
          allowGenerateId={false}
        />

        {/* Personal Information Fields */}
        <PersonalInfoFields
          personalInfo={companyInfo}
          handlePersonalInfoChange={handleCompanyInfoChange}
        />

        {/* Address Information Fields */}
        <AddressInfoFields
          addressInfo={companyInfo}
          handleAddressInfoChange={handleCompanyInfoChange}
        />

        {/* Company Information Fields */}
        <CompanyInfoFields
          companyInfo={companyInfo}
          handleCompanyInfoChange={handleCompanyInfoChange}
        />
      </div>
    </>
  );
};

export default AdminCompanyFormEdit;
