import React from "react";
import Form from "../Form";
import Grid from "../Grid";
import Select from "../../atoms/Select";
import Heading from "../../atoms/Heading";
import TextFormField from "../../molecules/TextFormField";
export default function ChairpersonForm({
  method = "POST",
  onSubmit = () => {},
}) {
  return (
    <Form method={method} onSubmit={onSubmit}>
      <TextFormField label="Position" name="first_name" />
      <TextFormField label="Middle Name" name="middle_name" />
      <TextFormField label="Last Name" name="last_name" />
    </Form>
  );
}
