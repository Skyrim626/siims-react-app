import { Field, Label } from "@headlessui/react";
import React from "react";
// import Label from "../atoms/Label";

// Renders a Form Field
export default function FormField({
  label = "",
  labelClassName = "",
  name,
  children,
  required,
}) {
  return (
    <>
      <Field className="flex flex-col space-y-2 text-sm">
        {/* Render label if it has value */}
        {label && (
          <Label htmlFor={name} className={labelClassName}>
            {label}{" "}
            {required && <span className="text-red-600 font-bold">*</span>}
          </Label>
        )}
        {children}
      </Field>
    </>
  );
}
