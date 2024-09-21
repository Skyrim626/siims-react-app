import React, { useEffect, useState } from "react";
import { getRequest, putRequest } from "../../../api/apiHelpers";
import Heading from "../../../components/common/Heading";
import { Button, Input, Select } from "@headlessui/react";
import PersonalInfoFields from "../../../components/forms/PersonalInfoFields";
import AddressInfoFields from "../../../components/forms/AddressInfoFields";
import useForm from "../../../hooks/useForm";
import FormField from "../../../components/common/FormField";

const DeanFormEdit = ({ selectedDeanId = null, isOpen, setIsOpen }) => {
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollegeId, setSelectedCollegeId] = useState();
  const [colleges, setColleges] = useState([]);

  const [id, setId] = useState();

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

  // Fetch Dean User By ID
  useEffect(() => {
    const fetchData = async () => {
      const deanResponse = await getRequest({
        url: `/api/v1/admin/users/deans/${selectedDeanId}`,
      });

      const collegeResponse = await getRequest({
        url: "/api/v1/admin/colleges",
      });

      // Set Colleges List
      setColleges(collegeResponse);

      // Populate personal and address info states
      // Helper function to map response data to the form states
      const updateFormFields = (data, setStateFunction) => {
        Object.keys(data).forEach((key) => {
          setStateFunction({
            target: {
              name: key,
              value: data[key] || "",
            },
          });
        });
      };

      // Update Personal Information
      const personalInfoData = {
        first_name: deanResponse.first_name,
        middle_name: deanResponse.middle_name,
        last_name: deanResponse.last_name,
        email: deanResponse.email,
        gender: deanResponse.gender,
        phone_number: deanResponse.phone_number,
      };
      updateFormFields(personalInfoData, handlePersonalInfoChange);

      // Update Address Information
      const addressInfoData = {
        street: deanResponse.street,
        barangay: deanResponse.barangay,
        city_municipality: deanResponse.city_municipality,
        province: deanResponse.province,
        postal_code: deanResponse.postal_code,
      };
      updateFormFields(addressInfoData, handleAddressInfoChange);

      // Set ID
      setId(deanResponse.id);

      // Set the initial selected college ID based on the dean's data
      if (deanResponse.college_id) {
        setSelectedCollegeId(deanResponse.college_id);
      }

      // Stop Loading
      setIsLoading(false);
    };

    // Run Fetching
    fetchData();
  }, []);

  // Submit handler (for example purposes)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload
    const deanData = {
      id,
      ...personalInfo, // Spread personalInfo data
      ...addressInfo, // Spread addressInfo data
      college_id: selectedCollegeId,
    };

    console.log(deanData);

    // Request
    const request = {
      url: `/api/v1/admin/users/deans/${id}`,
      data: deanData,
    };

    // Sends the payload to the server
    const response = await putRequest(request);

    // Check if response status is 200
    if (response.status === 200) {
      // Store success message in sessionStorage
      sessionStorage.setItem("toastMessage", response.data.success);

      // Close Modal/Dialog
      setIsOpen(false);

      // Reload the page to display new data
      // window.location.reload();
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* ID Field */}
          <div>
            <Heading
              level={5}
              color="black"
              text={"Login Information"}
              className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
            />
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="flex items-center">
                  <Input
                    type="text"
                    className="outline-none text-black rounded-sm p-2 text-sm bg-gray-300"
                    name="id"
                    onChange={(e) => setId(e.target.value)}
                    placeholder="ID"
                    value={id}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

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
                    value={selectedCollegeId}
                    onChange={(e) => {
                      setSelectedCollegeId(e.target.value);
                    }}
                  >
                    <option value="">-Select a College-</option>
                    {colleges.map((college) => (
                      <option key={college.id} value={college.id}>
                        {college.name}
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
      )}
    </>
  );
};

export default DeanFormEdit;
