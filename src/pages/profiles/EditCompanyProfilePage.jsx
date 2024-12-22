import { Button, Field, Input, Label } from "@headlessui/react";
import React, { useState } from "react";
import { postFormDataRequest, putFormDataRequest } from "../../api/apiHelpers";

const EditCompanyProfilePage = ({ authorizeRole }) => {
  // Input State
  const [logoPhoto, setLogoPhoto] = useState("https://via.placeholder.com/150");

  // Handle Logo Photo Change
  const handleLogoPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setLogoPhoto(reader.result); // Update logo preview

        // Create FormData and append the file
        const formData = new FormData();
        formData.append("logo", file); // Append the logo file to the FormData

        // Send the FormData with the file to the server
        try {
          const response = await putFormDataRequest({
            url: "/api/v1/profiles/update-logo", // Replace with your API endpoint
            data: formData,
          });
          console.log("File uploaded successfully:", response);
        } catch (error) {
          console.error("Error uploading logo:", error);
        }
      };
      reader.readAsDataURL(file); // Preview the logo image
    }
  };

  return (
    <main className="w-full min-h-screen py-1">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

          {/* Cover Photo Section */}
          <div className="flex flex-col items-center mt-5 space-y-5 sm:flex-row sm:items-center sm:space-y-0">
            <img
              className="object-cover w-full h-48 rounded-lg ring-2 ring-indigo-300 dark:ring-indigo-500"
              src="https://via.placeholder.com/600x200"
              alt="Cover Photo"
            />
            <div className="flex flex-col space-y-5 sm:ml-8">
              <Button
                type="button"
                className="px-4 py-2 text-md font-medium text-white focus:outline-none bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Change cover photo
              </Button>
              <Button
                type="button"
                className="px-4 py-2 text-md font-medium text-indigo-900 focus:outline-none bg-white border border-indigo-200 rounded-md hover:bg-indigo-100"
              >
                Delete cover photo
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <Field className="w-full">
                  <Label
                    for="firstName"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your first name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your first name"
                    value="Jane"
                    required
                  />
                </Field>

                <Field className="w-full">
                  <Label
                    for="first_name"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your middle name
                  </Label>
                  <Input
                    type="text"
                    id="middleName"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your first name"
                    value="Merge"
                  />
                </Field>

                <div className="w-full">
                  <label
                    for="last_name"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your last name"
                    value="Ferguson"
                    required
                  />
                </div>
              </div>

              <Field className="mb-2 sm:mb-6">
                <Label
                  for="email"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Your email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="your.email@mail.com"
                  required
                />
              </Field>

              {/* Phone Number */}
              <Field className="mb-2 sm:mb-6">
                <Label
                  for="phoneNumber"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Your phone number
                </Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="+631234567890"
                  required
                />
              </Field>

              {/* Gender Selection */}
              <Field className="mb-2 sm:mb-6">
                <Label
                  for="gender"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Select your gender
                </Label>
                <select
                  id="gender"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled selected>
                    Choose your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </Field>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="text-white bg-blue-500  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Save
                </Button>
              </div>
            </div>
            <div>
              <div className="space-y-10 p-6 bg-gray-100 dark:bg-gray-900">
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Profile Avatar"
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <Button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-blue-500 rounded-lg border border-indigo-200 hover:bg-blue-600 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Change profile
                    </Button>
                    <button
                      type="button"
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    >
                      Delete profile
                    </button>
                  </div>
                </div>

                {/* Logo Section */}

                {/* Logo Section */}
                <div className="space-y-10 p-6 bg-gray-100 dark:bg-gray-900">
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    <img
                      className="object-cover w-40 h-40 p-1 rounded-lg ring-2 ring-indigo-300 dark:ring-indigo-500"
                      src={logoPhoto} // Display the selected logo photo
                      alt="Company Logo"
                    />
                    <div className="flex flex-col space-y-5 sm:ml-8">
                      {/* File input button */}
                      <label
                        htmlFor="logo-upload"
                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-blue-500 rounded-lg border border-indigo-200 hover:bg-blue-600 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
                      >
                        Change logo
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoPhotoChange}
                          className="hidden"
                        />
                      </label>

                      {/* Delete logo button */}
                      <button
                        type="button"
                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                      >
                        Delete logo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditCompanyProfilePage;
