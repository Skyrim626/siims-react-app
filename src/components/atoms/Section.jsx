import React from "react";

export default function Section({ className, children }) {
  return (
    <>
      <section className={`mt-4 ${className}`}>{children}</section>
    </>
  );
}
