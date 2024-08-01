import React from "react";

// Returns a select component
export default function Select({
  options,
  label,
  labelColor = "text-gray-900",
  name,
  value,
  onChange,
  className = "p-3 px-3 rounded-md outline-none ring-offset-2 focus:ring-2 ring-blue-400/50",
}) {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className={`text-lg ${labelColor}`}>{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
