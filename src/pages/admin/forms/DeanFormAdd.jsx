import React, { useState } from "react";
import useForm from "../../../hooks/useForm";
import PersonalInfoFields from "../../../components/forms/PersonalInfoFields";
import AddressInfoFields from "../../../components/forms/AddressInfoFields";
import IDPasswordInfoFields from "../../../components/forms/IDPasswordInfoFields";
import { Button, Select } from "@headlessui/react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { postRequest } from "../../../api/apiHelpers";
import { toast } from "react-toastify";

const DeanFormAdd = ({ setIsOpen, colleges = [] }) => {
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

  // College State
  const [college, setCollege] = useState("");

  // Submit handler (for example purposes)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload
    const deanData = {
      id,
      password,
      ...personalInfo, // Spread personalInfo data
      ...addressInfo, // Spread addressInfo data
      college_id: college,
    };

    // Request
    const request = {
      url: "/api/v1/admin/users/deans",
      data: deanData,
    };

    // Sends the payload to the server
    const response = await postRequest(request);

    // Check if response status is 200
    if (response.status === 200) {
      // Store success message in sessionStorage
      sessionStorage.setItem("toastMessage", response.data.success);

      // Close Modal/Dialog
      setIsOpen(false);

      // Reload the page to display new data
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* ID and Password Fields */}
      <IDPasswordInfoFields
        id={id}
        setId={setId}
        password={password}
        setPassword={setPassword}
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

      {/* Dean Information Fields */}
      <div>
        <Heading
          level={5}
          color="black"
          text={"Dean Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />
        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"College"}
              name={"college"}
              labelClassName="text-sm text-black font-semibold"
            >
              <Select
                name="status"
                className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none px-2 py-2"
                aria-label="Project status"
                onClick={(e) => {
                  setCollege(e.target.value);
                }}
              >
                <option value="">-Select a College-</option>
                {colleges.map((college) => (
                  <option key={college["id"]} value={college["id"]}>
                    {college["name"]}
                    {college.dean_id && ` | Occupied by ${college.dean_id}`}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>
        </div>
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default DeanFormAdd;
