import React from "react";
import { CircleLoader } from "react-spinners";

export default function Loader() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <CircleLoader color="#123abc" size={150} />
      </div>
    </>
  );
}
