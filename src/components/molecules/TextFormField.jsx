import React from "react";

// Atom Component Imports
import Input from "../atoms/Input";

export default function TextFormField({
  label,
  labelSize = "small",
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
  // Render Label
  const renderLabel = () => {
    let fontSize = "text-sm";

    // Font Size for label
    switch (labelSize.toLowerCase()) {
      case "small":
        fontSize = "text-sm";
        break;
      case "medium":
        fontSize = "text-md";
        break;
      case "large":
        fontSize = "text-lg";
        break;
      case "extraLarge":
        fontSize = "text-xl";
        break;
      default:
        fontSize = "text-sm";
    }

    console.log(fontSize);

    // Return label
    return (
      <label htmlFor={name} className={`${fontSize} ${labelColor}`}>
        {label}
      </label>
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <label htmlFor={name} className={`text-lg ${labelColor}`}>
          {renderLabel()}
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
