import AddressInfoFields from "../../../forms/fields/AddressInfoFields";
import CompanyInfoFields from "../../../forms/fields/CompanyInfoFields";
import LoginInfoFields from "../../../forms/fields/LoginInfoFields";
import PersonalInfoFields from "../../../forms/fields/PersonalInfoFields";

const ChairpersonCompanyFormAdd = ({
  companyInfo,
  handleCompanyInfoChange,
}) => {
  return (
    <>
      {/* Company Information Fields */}
      <div className="flex flex-col gap-3">
        {/* ID and Password Fields */}
        <LoginInfoFields
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

export default ChairpersonCompanyFormAdd;
