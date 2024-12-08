import React from "react";

const SectionCard = ({ title, children }) => (
  <div className="p-6 border rounded-lg shadow-lg bg-gray-50 space-y-4">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

export default SectionCard;
