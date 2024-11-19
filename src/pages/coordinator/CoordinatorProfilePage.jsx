import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import Page from "../../components/common/Page";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { putRequest } from "../../api/apiHelpers";

const genders = ["male", "female", "other"];

const CoordinatorProfilePage = () => {
  // Fetch profile data
  const initial_profile = useLoaderData();

  // Open Navigation and Location
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(initial_profile);

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
      // Ready payload
      const payload = {
        first_name: profile["firstName"],
        middle_name: profile["middleName"],
        last_name: profile["lastName"],
        email: profile["email"],
        gender: profile["gender"],
      };

      try {
        // Use Method PUT
        const response = await putRequest({
          url: "/api/v1/coordinator/profile",
          data: payload,
        });

        if (response) {
          navigate(location.pathname); // Back to Profile Page
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <Page>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Coordinator Profile
            </h1>
            <button
              onClick={handleSaveChanges}
              className={`px-5 py-2 text-sm font-medium rounded-lg shadow-md ${
                isEditing
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              } focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                isEditing ? "focus:ring-green-300" : "focus:ring-indigo-300"
              }`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <form className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              ) : (
                <p className="mt-2 text-gray-800">{profile.firstName}</p>
              )}
            </div>

            {/* Middle Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="middleName"
                  value={profile.middleName}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              ) : (
                <p className="mt-2 text-gray-800">{profile.middleName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              ) : (
                <p className="mt-2 text-gray-800">{profile.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              ) : (
                <p className="mt-2 text-gray-800">{profile.email}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              {isEditing ? (
                <Listbox value={profile.gender} onChange={handleGenderChange}>
                  {({ open }) => (
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <span className="block truncate">{profile.gender}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDown
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 w-full mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {genders.map((gender, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                  active
                                    ? "text-white bg-indigo-600"
                                    : "text-gray-900"
                                }`
                              }
                              value={gender}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {gender}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                      <Check
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              ) : (
                <p className="mt-2 text-gray-800">{profile.gender}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default CoordinatorProfilePage;
