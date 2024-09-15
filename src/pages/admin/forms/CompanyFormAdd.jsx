import React, { useState } from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import Button from "../../../components/common/Button";
import { generateID, generatePassword } from "../../../utils/generator";
import { postRequest } from "../../../api/apiHelpers";
import { toast } from "react-toastify";
import { Select } from "@headlessui/react";

const CompanyFormAdd = ({
  isOpen,
  setIsOpen,
  companies = [],
  setCompanies = () => {},
}) => {
  // States for Company Form

  // Login Informations State
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

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

  // A function theat handles the submit
  const onSubmit = async () => {
    // Payload
    const companyData = {
      // Login Information
      id,
      password,
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
      url: "/api/v1/users/companies/create",
      data: companyData,
    };
    // Sends the payload to the server
    const response = await postRequest(request);

    // Check if response status is 200
    if (response.status === 200) {
      // Close Modal/Dialog
      setIsOpen(false);

      // Set new company
      setCompanies([...companies, companyData]);

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
                    value={id}
                  />
                  <Button
                    className="bg-blue-700 transition duration-150 hover:bg-blue-800 h-full px-2 text-white font-semibold rounded-e-sm"
                    onClick={() => setId(generateID())}
                  >
                    Generate ID
                  </Button>
                </div>
              </FormField>

              <FormField
                label={"Password"}
                name={"password"}
                labelClassName="text-sm text-black font-semibold"
              >
                <div className="flex items-center">
                  <input
                    type="text"
                    className="outline-none text-black rounded-sm p-2 text-sm"
                    name="password"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    placeholder="password"
                    value={password}
                  />
                  <Button
                    className="bg-blue-700 whitespace-nowrap transition duration-150 hover:bg-blue-800 h-full px-2 text-white font-semibold rounded-e-sm"
                    onClick={() => setPassword(generatePassword(12))}
                  >
                    Generate Password
                  </Button>
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
                  onClick={(e) => setGender(e.target.value)}
                >
                  <option value="">-- Select a Gender -- </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
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

export default CompanyFormAdd;
