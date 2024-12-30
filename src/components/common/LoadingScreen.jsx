import React from "react";
import { CircleLoader } from "react-spinners";

/**
 * Loading Screen.
 */
export default function LoadingScreen() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-800 absolute top-0 left-0 right-0 bottom-0">
        <CircleLoader color="#123abc" size={150} />
      </div>
    </>
  );
}
