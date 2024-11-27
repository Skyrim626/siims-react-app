import React from "react";

const FormField = ({ label, type = "text", value, onChange, name }) => (
  <div className="mb-4">
    <label className="text-sm font-semibold text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

export default FormField;
