import React from "react";

export default function TextBox({
  children,
  className = "gap-2 bg-white rounded-lg border-t-4 px-5 py-8",
  borderColor = "border-t-blue-700",
}) {
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center ${borderColor} ${className}`}
      >
        {children}
      </div>
    </>
  );
}
