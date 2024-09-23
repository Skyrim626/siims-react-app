import AddressInfoFields from "../../../forms/AddressInfoFields";
import CompanyInfoFields from "../../../forms/CompanyInfoFields";
import IDPasswordInfoFields from "../../../forms/IDPasswordInfoFields";
import PersonalInfoFields from "../../../forms/PersonalInfoFields";

const DeanCompanyFormEdit = ({ companyInfo, handleCompanyInfoChange }) => {
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

export default DeanCompanyFormEdit;
