import React from "react";

// Import Outlet
import { Navigate, Outlet } from "react-router-dom";

// Import Image
import formImage from "../../assets/images/form-image.svg";

// Import Context
import { appStateContext } from "../../contexts/AppContextProvider";
import useAuth from "../../hooks/useAuth";

// Guest Layout Component
export default function GuestLayout() {
  const { token } = appStateContext();

  const { testing } = useAuth();

  // Check if the token exist
  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {/* Form Section */}
      <section className="flex items-center min-h-screen bg-gray-800">
        {/* Form Image */}
        <div className="hidden md:block md:w-1/2 min-h-screen">
          <img src={formImage} alt="SIIMS Logo" className="min-h-screen" />
        </div>
        {/* Form Container */}
        <div className="flex flex-col px-10 py-2 w-full text-white md:w-1/2">
          <Outlet />
        </div>
      </section>
    </>
  );
}
