import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelectionPage = ({ roles }) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    console.log(role);
    if (role === "student") {
      navigate(`/auth/my`);
    } else {
      navigate(`/auth/${role}`); // Navigate based on selected role
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 font-sans">
      <h2 className="mb-8 text-3xl font-bold">Select Your Role</h2>
      <ul className="w-full max-w-md space-y-4">
        {roles.map((role) => (
          <li
            key={role}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md cursor-pointer transition duration-300 hover:bg-blue-500"
            onClick={() => handleRoleSelect(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
            {/* Capitalize role */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleSelectionPage;
