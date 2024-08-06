import React from "react";

export default function Form({ children, method, className, onSubmit }) {
  return (
    <form method={method} className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
