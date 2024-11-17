// Libraries
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

// Assets
import formImage from "../../assets/images/form-image.svg";

// Other imports
import { useAuth } from "../../hooks/useAuth";

// Import Components
import Page from "../common/Page";

// Guest Layout Component
export default function GuestLayout() {
  const { token } = useAuth();

  // Check if token does exist
  if (token) {
    // If exist navigate to /auth
    return <Navigate to={"/auth"} />;
  }

  return (
    <>
      {/* Form Section */}
      <Page className="flex items-center min-h-screen bg-gray-800">
        {/* Form Image */}
        <div className="hidden md:block md:w-1/2 min-h-screen">
          <img src={formImage} alt="SIIMS Logo" className="min-h-screen" />
        </div>
        {/* Form Container */}
        <div className="flex flex-col px-10 py-2 w-full text-white md:w-1/2">
          <Outlet />
        </div>
      </Page>
    </>
  );
}
