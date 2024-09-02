import React from "react";

export default function Label({ label = "", htmlFor = "", className = "" }) {
  // Return Label
  return (
    <>
      <label htmlFor={htmlFor} className={className}>
        {label}
      </label>
    </>
  );
}
