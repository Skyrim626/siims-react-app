import React from "react";
import Label from "../atoms/Label";

// Renders a Form Field
export default function FormField({
  label,
  labelSize,
  labelColor,
  name,
  children,
}) {
  return (
    <>
      <div className="flex flex-col space-y-2">
        {/* Render label if it has value */}
        {label && (
          <Label
            label={label}
            htmlFor={name}
            labelSize={labelSize}
            labelColor={labelColor}
          />
        )}
        {children}
      </div>
    </>
  );
}
