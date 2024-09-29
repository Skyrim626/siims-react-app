import React, { useState } from "react";
import IDPasswordInfoFields from "../../../components/forms/fields/LoginInfoFields";
import PersonalInfoFields from "../../../components/forms/fields/PersonalInfoFields";
import AddressInfoFields from "../../../components/forms/fields/AddressInfoFields";
import CompanyInfoFields from "../../../components/forms/fields/CompanyInfoFields";

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
