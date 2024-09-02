import React from "react";

// Input Atom Component
export default function Input({
  className = "p-3",
  error = {},
  name = "",
  onChange = () => {},
  placeholder,
  readOnly = false,
  required = false,
  rounded = false,
  type = "text",
  value = "",
}) {
  return (
    <input
      className={`outline-none ${className} ${
        rounded ? "rounded-md" : ""
      } ${className} ${readOnly ? "bg-gray-500 cursor-not-allowed" : ""}`}
      name={name}
      placeholder={placeholder || `Enter your ${name || "blank"}`}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      type={type}
      value={value}
    />
  );
}
