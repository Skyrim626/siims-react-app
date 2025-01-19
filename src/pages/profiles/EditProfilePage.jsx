import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import {
  postFormDataRequest,
  putFormDataRequest,
  putRequest,
} from "../../api/apiHelpers";
import useForm from "../../hooks/useForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmLogoChangeModal from "../../components/modals/ConfirmLogoChangeModal";
import Loader from "../../components/common/Loader";
import {
  getCoverImage,
  getLogoImage,
  getProfileImage,
} from "../../utils/imageHelpers";
import ConfirmChangeModal from "../../components/modals/ConfirmChangeModal";
import ExperienceEducationCertificateTabs from "./ExperienceEducationCertificateTabs";
import RoleBasedView from "../../components/common/RoleBasedView";

// Render Edit Profile Page
const EditProfilePage = ({ authorizeRole }) => {
  // Open Location
  const location = useLocation();
  // Fetch ID state
  const { id, profile } = location.state;

  // Declare empty variable
  let fetchProfileByIDPath = `/api/v1/profiles/${id};`;
  let editPersonalInfoPath = `/api/v1/profiles/update/${id}`;
  let editCoverPhotoPath = `/api/v1/profiles/update-cover/${id}`;
  let editProfilePhotoPath = `/api/v1/profiles/update-profile/${id}`;
  let editLogoPath = ""; // ! FOR COMPANY and authorize ADMIN

  /**
   * Contain api route base on the role
   */
  switch (authorizeRole) {
    case "company":
      editLogoPath = "/api/v1/profiles/update-logo";
      break;
  }

  // Render Edit Profile Page
  return (
    <RenderEditProfilePage
      authorizeRole={authorizeRole}
      paths={{
        fetchProfileByIDPath,
        editLogoPath,
        editPersonalInfoPath,
        editCoverPhotoPath,
        editProfilePhotoPath,
      }}
      userID={id}
      profile={profile}
    />
  );
};

// Render Edit Profile Page Components
const RenderEditProfilePage = ({
  authorizeRole,
  paths = {},
  userID,
  profile = {},
}) => {
  // Open navigate
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // ! FOR LOGO
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false); // ! FOR COVER
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Use Form
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    id: profile.id,
    firstName: profile.first_name,
    middleName: profile.middle_name,
    lastName: profile.last_name,
    email: profile.email,
    gender: profile.gender ? profile.gender.toLowerCase() : "",
    phoneNumber: profile.phone_number,
    street: profile.street,
    barangay: profile.barangay,
    cityMunicipality: profile.city_municipality,
    province: profile.province,
    postalCode: profile.postal_code,
    coverImageURL: profile.cover_image_url,
    profileImageURL: profile.profile_image_url,

    // Company Unique Attributes
    companyName: profile.name,
    logoURL: profile.logo_url,
    websiteURL: profile.website_url,

    // Student Unique Attributes
    aboutMe: profile.about_me,
    dateOfBirth: profile.date_of_birth,
  });

  // * For Logo Photo
  const handleLogoPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store selected file
      setModalOpen(true); // Open the modal to confirm
    }
  };

  // * For Cover Photo
  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store selected file
      setIsCoverModalOpen(true); // Open the modal to confirm
    }
  };

  // * For Profile Photo
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store selected file
      setIsProfileModalOpen(true); // Open the modal to confirm
    }
  };

  // * Confirm Profile Upload
  const handleConfirmAndUploadProfilePhoto = async () => {
    setLoading(true); // Open Loading
    setIsProfileModalOpen(false); // Close modal

    if (selectedFile) {
      const formDataToSend = new FormData();
      formDataToSend.append("profile", selectedFile);

      try {
        const response = await postFormDataRequest({
          url: paths.editProfilePhotoPath, // Path to upload file
          data: formDataToSend,
        });

        // Update the logo preview after a successful upload
        if (response) {
          // console.log(response.data);

          setFormValues({
            profileImageURL: response.data,
          });
        }

        /* setFormData((prev) => ({
          ...prev,
          logoURL: URL.createObjectURL(selectedFile),
        })); */
      } catch (error) {
        console.error("Error uploading profile image:", error);
        // alert("Failed to upload the profile image. Please try again.");
      } finally {
        setLoading(false); // Close Loading
      }
    }
  };

  // * Confirm Logo Upload
  const handleConfirmAndUploadLogo = async () => {
    setLoading(true); // Open Loading
    setModalOpen(false); // Close modal

    if (selectedFile) {
      const formDataToSend = new FormData();
      formDataToSend.append("logo", selectedFile);

      try {
        const response = await postFormDataRequest({
          url: paths.editLogoPath, // Path to upload file
          data: formDataToSend,
        });

        // Update the logo preview after a successful upload
        if (response) {
          setFormValues({
            logoURL: response.data,
          });
        }

        /* setFormData((prev) => ({
          ...prev,
          logoURL: URL.createObjectURL(selectedFile),
        })); */
      } catch (error) {
        console.error("Error uploading logo:", error);
        // alert("Failed to upload the logo. Please try again.");
      } finally {
        setLoading(false); // Close Loading
      }
    }
  };

  // * Confirm Cover Upload
  const handleConfirmAndUploadCoverPhoto = async () => {
    setLoading(true); // Open Loading
    setIsCoverModalOpen(false); // Close modal

    if (selectedFile) {
      const formDataToSend = new FormData();
      formDataToSend.append("cover", selectedFile);

      try {
        const response = await postFormDataRequest({
          url: paths.editCoverPhotoPath, // Path to upload file
          data: formDataToSend,
        });

        // Update the logo preview after a successful upload
        if (response) {
          setFormValues({
            coverImageURL: response.data,
          });
        }

        /* setFormData((prev) => ({
          ...prev,
          logoURL: URL.createObjectURL(selectedFile),
        })); */
      } catch (error) {
        console.error("Error uploading cover image:", error);
        // alert("Failed to upload the cover image. Please try again.");
      } finally {
        setLoading(false); // Close Loading
      }
    }
  };

  // Update Personal Information
  const updatePersonalInformation = async () => {
    // Set Loading
    setLoading(true);

    // Ready Payload
    const payload = {
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      email: formData.email,
      gender: formData.gender ? formData.gender.toLowerCase() : "",
      phone_number: formData.phoneNumber,
      street: formData.street,
      barangay: formData.barangay,
      city_municipality: formData.cityMunicipality,
      province: formData.province,
      postal_code: formData.postalCode,

      // Company Unique Attributes
      name: formData.companyName,
      website_url: formData.websiteURL,

      // Student Unique Attributes
      date_of_birth: formData.dateOfBirth,
      about_me: formData.aboutMe,
    };

    try {
      // PUT METHOD
      const response = await putRequest({
        url: paths.editPersonalInfoPath,
        data: payload,
      });

      // Check response
      if (response) {
        navigate(-1); // Return back to the page
      }
    } catch (error) {
      consoe.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen py-1">
      <Loader loading={loading} />
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

          {/* Cover Photo Section */}
          <div className="flex flex-col items-center mt-5 space-y-5 sm:flex-row sm:items-center sm:space-y-0">
            <img
              className="object-cover w-full h-48 rounded-lg ring-2 ring-indigo-300 dark:ring-indigo-500"
              src={getCoverImage(formData.coverImageURL)}
              alt="Cover Photo"
            />
            {/* File Input and Actions */}
            <div className="flex flex-col space-y-5 sm:ml-8">
              <label
                htmlFor="cover-upload"
                className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-blue-500 rounded-lg border border-indigo-200 hover:bg-blue-600 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
              >
                Change cover photo
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoChange} // Trigger file selection
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              {/* First name, Middle name, Last Name */}
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                {/* First Name */}
                <Field className="w-full">
                  <Label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your first name
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Field>

                {/* Middle  Name */}
                <Field className="w-full">
                  <Label
                    htmlFor="middleName"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your middle name
                  </Label>
                  <Input
                    type="text"
                    name="middleName"
                    id="middleName"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your middle name"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </Field>

                {/* Last  Name */}
                <Field className="w-full">
                  <Label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your last name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </Field>
              </div>

              {/* About Me */}
              <Field className="mb-2 sm:mb-6">
                <Label
                  htmlFor="aboutMe"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Your about me
                </Label>
                <Textarea
                  type="text"
                  rows={6}
                  id="text"
                  name="aboutMe"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Your about me..."
                  value={formData.aboutMe}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              {/* Email */}
              <Field className="mb-2 sm:mb-6">
                <Label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Your email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="your.email@mail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              {/* Phone Number */}
              <Field className="mb-2 sm:mb-6">
                <Label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Your phone number
                </Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="+631234567890"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              {/* Gender Selection */}
              <Field className="mb-2 sm:mb-6">
                <Label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Select your gender
                </Label>
                <select
                  id="gender"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled selected>
                    Choose your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="panda">Panda</option>
                  <option value="robot">Robot</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </Field>

              {/* Street, Barangay */}
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                {/* Street */}
                <Field className="w-full">
                  <Label
                    htmlFor="street"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your street
                  </Label>
                  <Input
                    type="text"
                    id="street"
                    name="street"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                  />
                </Field>

                {/* Barangay */}
                <Field className="w-full">
                  <Label
                    htmlFor="barangay"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your barangay
                  </Label>
                  <Input
                    type="text"
                    id="barangay"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your barangay"
                    value={formData.barangay}
                    onChange={handleInputChange}
                    required
                  />
                </Field>
              </div>

              {/* City/Municipality */}
              <Field className="mb-2 sm:mb-6">
                <Label
                  htmlFor="cityMunicipality"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Your city/municipality
                </Label>
                <Input
                  type="text"
                  id="cityMunicipality"
                  name="cityMunicipality"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Your city/municipality"
                  value={formData.cityMunicipality}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              {/* Province, Postal Code */}
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                {/* Province */}
                <Field className="w-full">
                  <Label
                    htmlFor="province"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your province
                  </Label>
                  <Input
                    type="text"
                    id="province"
                    name="province"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                  />
                </Field>

                {/* PostalCode */}
                <Field className="w-full">
                  <Label
                    htmlFor="postalCode"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Your postal code
                  </Label>
                  <Input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </Field>
              </div>

              {/* Date Of Birth */}
              <Field className="mb-2 sm:mb-6">
                <Label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Your date of birth
                </Label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Your city/municipality"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              {/* // ! FOR COMPANY AND ADMIN ROLE ONLY */}
              {(authorizeRole === "admin" || authorizeRole === "company") && (
                <div>
                  {/* Company Name */}
                  <Field className="mb-2 sm:mb-6">
                    <Label
                      htmlFor="companyName"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your company name
                    </Label>
                    <Input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your company name"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </Field>

                  {/* Website URL */}
                  <Field className="mb-2 sm:mb-6">
                    <Label
                      htmlFor="websiteURL"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Your website URL
                    </Label>
                    <Input
                      type="text"
                      id="websiteURL"
                      name="websiteURL"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your website url"
                      value={formData.websiteURL}
                      onChange={handleInputChange}
                    />
                  </Field>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={updatePersonalInformation}
                  type="submit"
                  className="text-white bg-blue-500  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Save
                </Button>
              </div>

              {/* Work Experience Section */}
              <RoleBasedView authorizeRole={authorizeRole} roles={["student"]}>
                <ExperienceEducationCertificateTabs />
              </RoleBasedView>
            </div>
            <div>
              <div className="space-y-10 p-6 bg-gray-100 dark:bg-gray-900">
                {/* Profile Photo Section */}
                <div className="space-y-10 p-6 bg-gray-100 dark:bg-gray-900">
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    {/* Profile Preview */}
                    <img
                      className="object-cover w-40 h-40 p-1 ring-2 rounded-full ring-indigo-300 dark:ring-indigo-500"
                      src={getProfileImage(formData.profileImageURL)}
                      alt="User Profile"
                    />

                    {/* File Input and Actions */}
                    <div className="flex flex-col space-y-5 sm:ml-8">
                      <label
                        htmlFor="profile-upload"
                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-blue-500 rounded-lg border border-indigo-200 hover:bg-blue-600 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
                      >
                        Change profile
                        <input
                          id="profile-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePhotoChange} // Trigger file selection
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Confirmation Modal */}
                  <ConfirmLogoChangeModal
                    open={isModalOpen}
                    setOpen={setModalOpen}
                    handleConfirm={handleConfirmAndUploadLogo} // Upload on confirm
                    title="Confirm Logo Change"
                    message="Are you sure you want to change the company logo? This action will immediately upload and update the logo."
                  />
                </div>
                {/* // ! FOR COMPANY AND ADMIN ROLE ONLY */}
                {(authorizeRole === "company" || authorizeRole === "admin") && (
                  <>
                    {/* Logo Section */}
                    <div className="space-y-10 p-6 bg-gray-100 dark:bg-gray-900">
                      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                        {/* Logo Preview */}
                        <img
                          className="object-cover w-40 h-40 p-1 rounded-lg ring-2 ring-indigo-300 dark:ring-indigo-500"
                          src={getLogoImage(formData.logoURL)}
                          alt="Company Logo"
                        />

                        {/* File Input and Actions */}
                        <div className="flex flex-col space-y-5 sm:ml-8">
                          <label
                            htmlFor="logo-upload"
                            className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-blue-500 rounded-lg border border-indigo-200 hover:bg-blue-600 focus:z-10 focus:ring-4 focus:ring-indigo-200 cursor-pointer"
                          >
                            Change logo
                            <input
                              id="logo-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleLogoPhotoChange} // Trigger file selection
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Confirmation Modal */}
                      <ConfirmLogoChangeModal
                        open={isModalOpen}
                        setOpen={setModalOpen}
                        handleConfirm={handleConfirmAndUploadLogo} // Upload on confirm
                        title="Confirm Logo Change"
                        message="Are you sure you want to change the company logo? This action will immediately upload and update the logo."
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal (Logo) */}
      <ConfirmChangeModal
        open={isModalOpen}
        setOpen={setModalOpen}
        handleConfirm={handleConfirmAndUploadLogo} // Upload on confirm
        title="Confirm Logo Change"
        message="Are you sure you want to change the company logo? This action will immediately upload and update the logo."
      />

      {/* Confirmation Modal (Cover) */}
      <ConfirmChangeModal
        open={isCoverModalOpen}
        setOpen={setIsCoverModalOpen}
        handleConfirm={handleConfirmAndUploadCoverPhoto} // Upload on confirm
        title="Confirm Cover Change"
        message="Are you sure you want to change the cover photo? This action will immediately upload and update the cover."
      />

      {/* Confirmation Modal (Profile) */}
      <ConfirmChangeModal
        open={isProfileModalOpen}
        setOpen={setIsProfileModalOpen}
        handleConfirm={handleConfirmAndUploadProfilePhoto} // Upload on confirm
        title="Confirm Profile Change"
        message="Are you sure you want to change the profile photo? This action will immediately upload and update the profile."
      />
    </main>
  );
};

export default EditProfilePage;
