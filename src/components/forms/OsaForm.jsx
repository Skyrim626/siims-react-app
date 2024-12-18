import React from "react";
import LoginInfoFields from "./fields/LoginInfoFields";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AddressInfoFields from "./fields/AddressInfoFields";

const OsaForm = ({
  method = "post",
  osaInfo = {
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
  },
  handleOsaInfoChange,
  requiredFields = {
    id: true,
    password: true,
    firstName: true,
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
  },
  errors = {},
}) => {
  return (
    <>
      <form className="space-y-3">
        {method !== "put" && (
          <LoginInfoFields
            info={osaInfo}
            handleInfoChange={handleOsaInfoChange}
            requiredFields={requiredFields}
            errors={errors}
          />
        )}

        <PersonalInfoFields
          personalInfo={osaInfo}
          handlePersonalInfoChange={handleOsaInfoChange}
          requiredFields={requiredFields}
          errors={errors}
        />

        <AddressInfoFields
          addressInfo={osaInfo}
          handleAddressInfoChange={handleOsaInfoChange}
          errors={errors}
        />
      </form>
    </>
  );
};

export default OsaForm;
