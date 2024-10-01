import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@headlessui/react";
import Text from "../../components/common/Text";

const RoleSelectionPage = ({ roles }) => {
  const navigate = useNavigate();

  // Auth logout
  const { logout } = useAuth();

  const handleRoleSelect = (role) => {
    console.log(role);
    if (role === "student") {
      navigate(`/auth/my`);
    } else {
      navigate(`/auth/${role}`); // Navigate based on selected role
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 font-sans relative">
      <Button
        onClick={logout}
        className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-red-500"
      >
        Logout
      </Button>
      <h2 className="mb-8 text-3xl font-bold">Select Your Role</h2>
      <ul className="w-full max-w-md space-y-4">
        {roles.map((role) => (
          <li
            key={role}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg cursor-pointer transition duration-300 hover:bg-blue-500"
            onClick={() => handleRoleSelect(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
            {/* Capitalize role */}
          </li>
        ))}
      </ul>
      <Text className="mt-6 text-center text-gray-600">
        Please select a role to continue.
      </Text>
    </div>
  );
};

export default RoleSelectionPage;
