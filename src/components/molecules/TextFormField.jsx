import React from "react";

// Atom Component Imports
import Input from "../atoms/Input";

export default function TextFormField({
  label,
  placeholder = "Enter Placeholder",
  className = "p-3 px-3 rounded-md outline-none ring-offset-2 focus:ring-2 ring-blue-400/50",
  name,
  type = "text",
  value,
  required = false,
  onChange = () => {},
  error,
  labelColor = "text-gray-200",
  readOnly = false,
}) {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <label htmlFor={name} className={`text-lg ${labelColor}`}>
          {label}
        </label>
        <Input
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={className}
          required={required}
          error={error}
          readOnly={readOnly}
        />
      </div>
    </>
  );
}
