import React from "react";

// Atom Component Imports
import Input from "../atoms/Input";
import Label from "../atoms/Label";

export default function TextFormField({
  label,
  labelSize = "small",
  labelColor = "text-gray-600",
  placeholder,
  className = "p-3 rounded-md ring-offset-2 focus:ring-2 ring-blue-400/50",
  name,
  type = "text",
  value,
  required = false,
  onChange = () => {},
  error,

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
        {/* Render Label Component if it is true */}
        {label && (
          <Label
            label={label}
            labelSize={labelSize}
            labelColor={labelColor}
            htmlFor={name}
          />
        )}
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
