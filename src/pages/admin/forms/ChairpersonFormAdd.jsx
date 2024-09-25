import React, { useState } from "react";
import useForm from "../../../hooks/useForm";
import LoginInfoFields from "../../../components/forms/fields/LoginInfoFields";
import PersonalInfoFields from "../../../components/forms/fields/PersonalInfoFields";
import AddressInfoFields from "../../../components/forms/fields/AddressInfoFields";
import ChairpersonInfoFields from "../../../components/forms/fields/ChairpersonInfoFields";

const ChairpersonFormAdd = () => {
  // States for id and password
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // Using the custom hook for Personal Information
  const [personalInfo, handlePersonalInfoChange] = useForm({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone_number: "",
  });

  // Using the custom hook for Address Information
  const [addressInfo, handleAddressInfoChange] = useForm({
    street: "",
    barangay: "",
    city_municipality: "",
    province: "",
    postal_code: "",
  });

  // Using  the custom hook for Chairperson Information
  const [chairpersonInfo, handleChairpersonInfo] = useForm({
    program_id: "",
  });

  const handleSubmit = async (e) => {};

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* ID and Password Fields */}
      <LoginInfoFields
        id={id}
        setId={setId}
        password={password}
        setPassword={setPassword}
        requiredFields={{
          id: true,
          password: true,
        }}
      />
      {/* Chairperson Information Fields */}
      <ChairpersonInfoFields
        chairpersonInfo={chairpersonInfo}
        handleChairpersonInfo={handleChairpersonInfo}
      />

      {/* Personal Information Fields */}
      <PersonalInfoFields
        personalInfo={personalInfo}
        handlePersonalInfoChange={handlePersonalInfoChange}
      />
      {/* Address Information Fields */}
      <AddressInfoFields
        addressInfo={addressInfo}
        handleAddressInfoChange={handleAddressInfoChange}
      />
    </form>
  );
};

export default ChairpersonFormAdd;
