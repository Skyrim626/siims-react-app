import React from "react";

const OSAProfile = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="relative">
        <img
          src="https://i1.wp.com/www.septic-rescue.com/wp-content/uploads/2017/03/lagoon-1200x300-1.jpg?ssl=1"
          alt="Header"
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <img
            src="https://th.bing.com/th/id/OIP.xtz3I16dFAP1Yo9UFyllWQHaHo?rs=1&pid=ImgDetMain"
            alt="OSA Logo"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div>
            {/* Company Name */}
            <h1 className="text-white text-2xl font-semibold">OSA</h1>
            {/* Location */}
            <p className="text-white">
              Pinewood Avenue, Barangay Luzon, Riverside, 92507, California
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-end items-center space-x-4">
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
          Public View
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-md px-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button className="px-4 py-2 text-blue-500 border-b-2 border-blue-500 font-medium">
            OSA
          </button>
          <button className="px-4 py-2 text-gray-500 hover:text-blue-500">
            About Me
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white shadow-md px-6 py-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">OSA Overview</h2>
        <p className="text-gray-600">This is the OSA information...</p>
      </div>
    </div>
  );
};

export default OSAProfile;
