import React from "react";

// Input Atom Component
export default function Input({
  type = "text",
  placeholder = "Enter Placeholder",
  className = "p-3",
  name,
  onChange = () => {},
  value,
  required = false,
  error,
  deactivated = false,
  readOnly = false,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`${className} ${readOnly ? "bg-gray-400" : ""}`}
        name={name}
        onChange={onChange}
        value={value}
        required={required}
        readOnly={readOnly}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </>
  );
}
