import React from "react";
import { PacmanLoader } from "react-spinners";

// For loading contents
export default function ContentLoader() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div>
        <PacmanLoader color="#ffffff" />
        <p className="mt-3 text-white font-bold text-md">Loading...</p>
      </div>
    </div>
  );
}
