import React from "react";
import { pickTextColor } from "../../config/style";

// Input Atom Component
export default function Input({
  className = "p-3",
  color = "",
  deactivated = false,
  error,
  name = "",
  onChange = () => {},
  placeholder,
  required = false,
  rounded = false,
  type = "text",
  value = "",

  readOnly = false,
}) {
  // Render input
  const renderInput = () => {
    // Returns a color
    const pickedTextColor = pickTextColor(color);

    // Returns a input
    return (
      <input
        className={`outline-none ${
          rounded ? "rounded-md" : ""
        } ${pickedTextColor} ${className} ${readOnly ? "bg-gray-400" : ""}`}
        name={name}
        placeholder={placeholder || `Enter your ${name || "blank"}`}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
        type={type}
        value={value}
      />
    );
  };

  return (
    <>
      {/* <input
        type={type}
        placeholder={placeholder || `Enter your ${name}`}
        className={` outline-none ${className} ${
          readOnly ? "bg-gray-400" : ""
        }`}
        name={name}
        onChange={onChange}
        value={value}
        required={required}
        readOnly={readOnly}
      /> */}
      {renderInput()}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </>
  );
}
