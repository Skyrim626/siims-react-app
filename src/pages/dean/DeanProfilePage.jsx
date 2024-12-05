import React, { useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import coverPhotoPlaceholder from "../../assets/images/dean/dean-cover-photo.jpg";
import profilePhotoPlaceholder from "../../assets/images/dean/dean-profile-photo.jpg";
import { MapPin, Edit } from "lucide-react";

const DeanProfilePage = () => {
  const [user, setUser] = useState({
    id: 2020301502,
    first_name: "James",
    middle_name: "Michael",
    last_name: "Smith",
    email: "smith@email.com",
    email_verified_at: "2024-12-04T05:32:39.000000Z",
    gender: "Male",
    phone_number: "123-456-7890",
    street: "Second St",
    barangay: "BarangayEast",
    city_municipality: "UrbanCity",
    province: "EasternProvince",
    postal_code: "12345",
    college_name: "College of Information Technology and Computing",
    created_at: null,
    updated_at: null,
  });

  const [coverPhoto, setCoverPhoto] = useState(coverPhotoPlaceholder);
  const [profilePhoto, setProfilePhoto] = useState(profilePhotoPlaceholder);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSaveChanges = () => {
    setUser(updatedUser);
    setIsEditing(false);
    console.log("Updated User Details:", updatedUser);
  };

  const handleCancelEdit = () => {
    setUpdatedUser(user);
    setIsEditing(false);
  };

  const handleChangeCoverPhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCoverPhoto(URL.createObjectURL(file));
    }
  };

  const handleChangeProfilePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  return (
    <Page>
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
          <div className="absolute bottom-4 right-4 z-10">
            <input
              type="file"
              accept="image/*"
              id="cover-photo-upload"
              onChange={handleChangeCoverPhoto}
              className="hidden"
            />
            <label
              htmlFor="cover-photo-upload"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Change Cover Photo
            </label>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 py-8">
          <div className="relative w-[150px] mx-auto mb-4">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-[150px] h-[150px] object-cover rounded-full border-4 border-white shadow-xl"
            />
            <div className="absolute bottom-0 right-0 z-10">
              <input
                type="file"
                accept="image/*"
                id="profile-photo-upload"
                onChange={handleChangeProfilePhoto}
                className="hidden"
              />
              <label
                htmlFor="profile-photo-upload"
                className="px-3 py-2 text-xs font-semibold text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 transition cursor-pointer"
              >
                Change
              </label>
            </div>
          </div>

          {/* Editable Form */}
          <div className="mt-8">
            {isEditing ? (
              <>
                {[
                  // Editable Fields
                  { label: "First Name", name: "first_name", type: "text" },
                  { label: "Middle Name", name: "middle_name", type: "text" },
                  { label: "Last Name", name: "last_name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone_number", type: "text" },
                  { label: "College Name", name: "college_name", type: "text" },
                ].map(({ label, name, type }) => (
                  <div key={name} className="mb-6">
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      value={updatedUser[name]}
                      onChange={handleInputChange}
                      className="block w-full mt-2 px-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                ))}
                <div className="flex gap-4 mt-6 justify-center">
                  <button
                    onClick={handleSaveChanges}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-4">
                  <Text className="text-3xl font-semibold text-gray-900">
                    {`${user.first_name} ${user.middle_name} ${user.last_name}`}
                  </Text>
                  <Text className="text-md text-gray-600">{user.email}</Text>
                </div>

                <div className="text-center mb-4">
                  <Text className="text-sm text-gray-600">
                    <strong>Gender:</strong> {user.gender}
                  </Text>
                </div>

                <div className="text-center mb-4">
                  <Text className="text-sm text-gray-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    {`${user.street}, ${user.barangay}, ${user.city_municipality}, ${user.province}, ${user.postal_code}`}
                  </Text>
                </div>

                <div className="text-center mb-6">
                  <Text className="text-sm font-medium text-gray-600">
                    {user.college_name}
                  </Text>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                  >
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Section>
    </Page>
  );
};

export default DeanProfilePage;
