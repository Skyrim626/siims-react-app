import AddressInfoFields from "../../../forms/fields/AddressInfoFields";
import CompanyInfoFields from "../../../forms/fields/CompanyInfoFields";
import IDPasswordInfoFields from "../../../forms/fields/LoginInfoFields";
import PersonalInfoFields from "../../../forms/fields/PersonalInfoFields";

const DeanCompanyFormAdd = ({ companyInfo, handleCompanyInfoChange }) => {
  return (
    <>
      {/* Company Information Fields */}
      <div className="flex flex-col gap-3">
        {/* ID and Password Fields */}
        <IDPasswordInfoFields
          info={companyInfo}
          handleInfoChange={handleCompanyInfoChange}
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

export default DeanCompanyFormAdd;
