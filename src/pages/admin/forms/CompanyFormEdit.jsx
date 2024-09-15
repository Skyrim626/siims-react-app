import React, { useEffect, useState } from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Button, Select } from "@headlessui/react";
import { putRequest } from "../../../api/apiHelpers";
import { toast } from "react-toastify";

const CompanyFormEdit = ({
  selectedData,
  isOpen,
  setIsOpen,
  companies,
  setCompanies,
}) => {
  // States for Company Form

  // Login Informations State
  const [id, setId] = useState("");

  // Personal Informations State

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Address Informations State
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Company Information
  const [companyName, setCompanyName] = useState("");
  const [webUrl, setWebUrl] = useState("");

  // Update useStates when selectedData changes
  useEffect(() => {
    setId(selectedData["id"]);
    setFirstName(selectedData["first_name"]);
    setMiddleName(selectedData["middle_name"]);
    setLastName(selectedData["last_name"]);
    setEmail(selectedData["email"]);
    setGender(selectedData["gender"]);
    setPhoneNumber(selectedData["phone_number"]);
    setStreet(selectedData["street"]);
    setBarangay(selectedData["barangay"]);
    setCity(selectedData["city_municipality"]);
    setProvince(selectedData["province"]);
    setPostalCode(selectedData["postal_code"]);
    setCompanyName(selectedData["company_name"]);
    setWebUrl(selectedData["website_url"]);
  }, [selectedData]);

  // Handles the submit of form
  const onSubmit = async () => {
    // Payload
    const companyData = {
      // Personal Information
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email,
      gender,
      phone_number: phoneNumber,
      // Address Information
      street,
      barangay,
      city_municipality: city,
      province,
      postal_code: postalCode,
      company_name: companyName,
      website_url: webUrl,
    };

    const request = {
      url: `/api/v1/users/companies/${id}`,
      data: companyData,
    };
    // Sends the payload to the server
    const response = await putRequest(request);

    // Check if response status is 200
    if (response.status === 200) {
      // Close Modal/Dialog
      setIsOpen(false);

      // Find the index of the company to update
      const updatedCompanies = companies.map((company) =>
        company.id === companyData.id ? { ...company, ...companyData } : company
      );

      // Update the state with the modified company
      setCompanies(updatedCompanies);

      // Show Toast
      toast.success(response.data.success);
    }
  };

  return (
    <>
      <form method="post" onSubmit={onSubmit} className="space-y-3">
        <div>
          <Heading
            level={5}
            color="black"
            text={"Login Information"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2 mt-4">
              <FormField
                label={"ID"}
                name={"id"}
                labelClassName="text-sm text-black font-semibold"
              >
                <div className="flex items-center">
                  <input
                    type="text"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="id"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    placeholder="ID"
                    readOnly
                    value={id}
                  />
                </div>
              </FormField>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <Heading
            level={5}
            color="black"
            text={"Personal Information"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />

          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-2 mt-4">
              <FormField
                label={"First Name"}
                name={"first_name"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="first_name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First name"
                  value={firstName}
                />
              </FormField>

              <FormField
                label={"Middle Name"}
                name={"middle_name"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="middle_name"
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                  placeholder="Middle name"
                  value={middleName}
                />
              </FormField>
              <FormField
                label={"Last Name"}
                name={"last_name"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="last_name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last name"
                  value={lastName}
                />
              </FormField>

              <FormField
                label={"Email"}
                name={"email"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="email"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  value={email}
                />
              </FormField>

              <FormField
                label={"Gender"}
                name={"gender"}
                labelClassName="text-sm text-black font-semibold"
              >
                <Select
                  name="status"
                  className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none px-2"
                  aria-label="Project status"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option value="">-- Select a Gender -- </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormField>

              <FormField
                label={"Phone Number"}
                name={"phoneNumber"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="phoneNumber"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  placeholder="Phone Number"
                  value={phoneNumber}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/*  Address Information */}
        <div>
          <Heading
            level={5}
            color="black"
            text={"Address Information"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />

          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-2 mt-4">
              <FormField
                label={"Street"}
                name={"street"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="street"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  placeholder="Street"
                  value={street}
                />
              </FormField>

              <FormField
                label={"Barangay"}
                name={"barangay"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="barangay"
                  onChange={(e) => {
                    setBarangay(e.target.value);
                  }}
                  placeholder="Barangay"
                  value={barangay}
                />
              </FormField>
              <FormField
                label={"City"}
                name={"city"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="city"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  placeholder="City"
                  value={city}
                />
              </FormField>

              <FormField
                label={"Province"}
                name={"province"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="province"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="province"
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                  placeholder="Province"
                  value={province}
                />
              </FormField>
              <FormField
                label={"Postal Code"}
                name={"postalCode"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="postalCode"
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                  placeholder="Phone Number"
                  value={postalCode}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/*  Company Information */}
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
                name={"companyName"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="company"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  placeholder="CompanyName "
                  value={companyName}
                />
              </FormField>
              <FormField
                label={"Website Url"}
                name={"webUrl"}
                labelClassName="text-sm text-black font-semibold"
              >
                <input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="webUrl"
                  onChange={(e) => {
                    setWebUrl(e.target.value);
                  }}
                  placeholder="Website URL"
                  value={webUrl}
                />
              </FormField>
            </div>

            <div className="flex justify-end items-end mt-3 gap-2">
              <Button
                type="button"
                className="py-2 px-4 text-sm rounded-sm font-bold text-white transition duration-300 bg-gray-500 hover:bg-gray-600 "
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button
                type="button"
                className="py-2 px-4 text-sm rounded-sm font-bold text-white transition duration-300 bg-blue-600 hover:bg-blue-700"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CompanyFormEdit;
