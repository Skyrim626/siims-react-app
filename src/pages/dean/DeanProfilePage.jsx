import React, { useState, useEffect } from "react";
import axios from "axios";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import coverPhotoPlaceholder from "../../assets/images/dean/dean-cover-photo.jpg";
import profilePhotoPlaceholder from "../../assets/images/dean/dean-profile-photo.jpg";
import { MapPin, Edit } from "lucide-react";
import useForm from "../../hooks/useForm";
import Loader from "../../components/common/Loader";
import { Button, Input } from "@headlessui/react";
import { getRequest, putRequest } from "../../api/apiHelpers";

const DeanProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  /**
   * User Info
   */
  const [userInfo, handleUserInfoChange, resetForm, setFormValues] = useForm({
    id: 2020301502,
    first_name: "James",
    middle_name: "Michael",
    last_name: "Smith",
    email: "smith@email.com",
    gender: "Male",
    phone_number: "123-456-7890",
    street: "Second St",
    barangay: "Barangay East",
    city_municipality: "UrbanCity",
    province: "EasternProvince",
    postal_code: "12345",
    college_name: "College of Information Technology and Computing",
  });
  // Profile State
  const [profilePhoto, setProfilePhoto] = useState(profilePhotoPlaceholder);
  // Cover State
  const [coverPhoto, setCoverPhoto] = useState(coverPhotoPlaceholder);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await getRequest({
          url: "/api/v1/profiles/dean",
        });
        const data = response;

        // console.log(data);

        if (data) {
          // Update the userInfo state with the fetched data
          setFormValues(data);
          /* setFormValues({
            id: data.id,
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            email: data.email,
            gender: data.gender,
            phone_number: data.phone_number,
            street: data.street,
            barangay: data.barangay,
            city_municipality: data.city_municipality,
            province: data.province,
            postal_code: data.postal_code,
            college_name: data.college_name,
          }); */
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleImageChange = (event, field) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setUserInfo((prev) => ({ ...prev, [field]: newImageUrl }));
    }
  };

  /**
   * Save a new info of Dean
   */
  const handleSaveChanges = async () => {
    console.log("Updated User Info:", userInfo);

    setLoading(true);
    try {
      // PUT METHOD
      const response = await putRequest({
        url: "/api/v1/profiles/dean",
        data: userInfo,
      });

      // console.log(response);

      if (response) {
        setFormValues(response.data);
      }
    } catch (error) {
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text="Profile" />
        <Text className="text-sm text-gray-600 mb-4">
          Manage and review your profile details.
        </Text>
        <hr className="my-6" />
      </Section>

      {/* Profile Section */}
      <Section className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="relative w-full h-[350px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <img
            src={coverPhoto}
            alt="Cover Photo"
            className="object-cover w-full h-full opacity-70"
          />
          {isEditing && (
            <div className="absolute bottom-4 right-4 z-10">
              <Input
                type="file"
                accept="image/*"
                id="cover_image_url"
                onChange={(e) => handleImageChange(e, "cover_image_url")}
                className="hidden"
              />
              <label
                htmlFor="cover_image_url"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Change Cover Photo
              </label>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="px-6 py-8">
          <div className="relative w-[150px] mx-auto mb-4">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-[150px] h-[150px] object-cover rounded-full border-4 border-white shadow-xl"
            />
            {isEditing && (
              <div className="absolute bottom-0 right-0 z-10">
                <Input
                  type="file"
                  accept="image/*"
                  id="profile_image_url"
                  onChange={(e) => handleImageChange(e, "profile_image_url")}
                  className="hidden"
                />
                <label
                  htmlFor="profile_image_url"
                  className="px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer"
                >
                  Change
                </label>
              </div>
            )}
          </div>

          {/* Editable Form */}
          {isEditing ? (
            <>
              {[
                { label: "First Name", name: "first_name", type: "text" },
                { label: "Middle Name", name: "middle_name", type: "text" },
                { label: "Last Name", name: "last_name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "phone_number", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name} className="mb-6">
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </label>
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    value={userInfo[name]}
                    onChange={handleUserInfoChange}
                    className="block w-full mt-2 px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              ))}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  College Name
                </label>
                <Input
                  id="college_name"
                  name="college_name"
                  type="text"
                  value={userInfo.college_name}
                  readOnly
                  className="block w-full mt-2 px-4 py-2 border rounded-lg text-gray-900 bg-gray-200"
                />
              </div>
              <div className="flex gap-4 mt-6 justify-center">
                <Button
                  onClick={handleSaveChanges}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <Text className="text-3xl font-semibold text-gray-900">
                  {`${userInfo.first_name} ${userInfo.middle_name} ${userInfo.last_name}`}
                </Text>
                <Text className="text-md text-gray-600">{userInfo.email}</Text>
              </div>

              <div className="text-center mb-4">
                <Text className="text-sm text-gray-600">
                  <strong>Gender:</strong> {userInfo.gender}
                </Text>
              </div>

              <div className="text-center mb-4">
                <Text className="text-sm text-gray-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                  {`${userInfo.street}, ${userInfo.barangay}, ${userInfo.city_municipality}, ${userInfo.province}, ${userInfo.postal_code}`}
                </Text>
              </div>

              <div className="text-center mb-6">
                <Text className="text-sm font-medium text-gray-600">
                  {userInfo.college_name}
                </Text>
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  <Edit className="w-4 h-4 inline mr-2" />
                  Edit Profile
                </Button>
              </div>
            </>
          )}
        </div>
      </Section>
    </Page>
  );
};

export default DeanProfilePage;
