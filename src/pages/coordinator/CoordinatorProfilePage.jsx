import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import Page from "../../components/common/Page";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { putRequest } from "../../api/apiHelpers";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

const genders = ["male", "female", "other"];

const CoordinatorProfilePage = () => {
  const { initial_profile } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // Set Loading
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: initial_profile["first_name"],
    middleName: initial_profile["middle_name"],
    lastName: initial_profile["last_name"],
    email: initial_profile["email"],
    gender: initial_profile["gender"],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleGenderChange = (gender) => {
    setProfile({ ...profile, gender });
  };

  const handleSaveChanges = async () => {
    if (isEditing) {
      const payload = {
        first_name: profile.firstName,
        middle_name: profile.middleName,
        last_name: profile.lastName,
        email: profile.email,
        gender: profile.gender,
      };

      // Set Loading
      setLoading(true);
      try {
        const response = await putRequest({
          url: "/api/v1/coordinator/profile",
          data: payload,
        });

        if (response) {
          navigate(location.pathname);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <Page>
      <Loader loading={loading} />

      {profile ? (
        <div>
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-300 to-indigo-600 h-60">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url('/path-to-header-image.jpg')` }}
            ></div>
            <div className="relative z-10 flex items-center h-full px-8">
              {/* Profile Photo */}
              <div className="w-28 h-28 rounded-full bg-white overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1732530361158-09f4154b6b3b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name and Button */}
              <div className="ml-6">
                {/* Name */}
                <h2 className="text-2xl font-semibold text-white">
                  {profile.firstName} {profile.lastName}
                </h2>
                {/* Edit Button */}
                <button
                  onClick={handleSaveChanges}
                  className={`mt-4 px-6 py-2 rounded-lg font-medium text-white ${
                    isEditing
                      ? "bg-green-500 hover:bg-green-600 focus:ring-green-300"
                      : "bg-blue-900 hover:bg-indigo-600 focus:ring-indigo-300"
                  } focus:outline-none focus:ring-4 transition`}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Form Section */}
          <div className="max-w-4xl mx-auto mt-10 bg-white shadow rounded-lg p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-2 text-gray-900">{profile.firstName}</p>
                )}
              </div>

              {/* Middle Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Middle Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="middleName"
                    value={profile.middleName}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-2 text-gray-900">{profile.middleName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-2 text-gray-900">{profile.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="mt-2 text-gray-900">{profile.email}</p>
                )}
              </div>

              {/* Gender */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600">
                  Gender
                </label>
                {isEditing ? (
                  <div className="mt-2">
                    <select
                      value={profile.gender}
                      onChange={(e) => handleGenderChange(e.target.value)}
                      className="w-full py-2 pl-3 pr-10 text-left border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      {genders.map((gender, index) => (
                        <option key={index} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="mt-2 text-gray-900">{profile.gender}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No profile available at the moment"
          message="Once activities are recorded, profile will appear here."
        />
      )}
    </Page>
  );
};

export default CoordinatorProfilePage;
