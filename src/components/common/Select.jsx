import React from "react";
import Label from "../atoms/Label";

export default function Select({
  label,
  labelSize = "small",
  labelColor = "text-gray-600",
  name,
  options = [],
  onChange = () => {},
  className = "mt-3 p-3 border rounded-md",
}) {
  return (
    <>
      <div className="flex flex-col space-y-2">
        {/*  Render label component if it is true */}
        {label && (
          <Label
            label={label}
            labelSize={labelSize}
            htmlFor={name}
            labelColor={labelColor}
          />
        )}
        <select onChange={onChange} className={className}>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
