import React from "react";

export default function Section({ className = "mt-4", children }) {
  return (
    <>
      <section className={className}>{children}</section>
    </>
  );
}
