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
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        name={name}
        onChange={onChange}
        value={value}
        required={required}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </>
  );
}
