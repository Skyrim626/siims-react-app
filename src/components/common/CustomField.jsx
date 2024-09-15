/**
 * Libraries
 */
import React from "react";
import PropTypes from "prop-types";

// Headless UI Libary
import { Field, Input, Label } from "@headlessui/react";

// Custom Field
const CustomField = ({
  name = "",
  label = "",
  value = "",
  placeholder = "",
  onChange = () => {},
  required = false,
  readOnly = false,
  className = "",
}) => {
  return (
    <Field className={className}>
      <Label refName={name}>{label}</Label>
      <Input
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
      />
    </Field>
  );
};

// Defining prop types
CustomField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
};

export default CustomField;
