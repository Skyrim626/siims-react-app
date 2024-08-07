import React, { useState } from "react";
import Form from "../Form";
import Grid from "../Grid";
import Select from "../../atoms/Select";
import Heading from "../../atoms/Heading";
import TextFormField from "../../molecules/TextFormField";
import { genders } from "../../../config/options";
import useFetch from "../../../hooks/useFetch";

const options = [
  { value: "student", label: "Student" },
  { value: "chairperson", label: "Chairperson" },
  { value: "dean", label: "Dean" },
];

export default function StudentForm({ method = "POST" }) {
  // States for Student Form
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");

  // Fetch programs data
  /* const { data = programs, loading, error } = useFetch("/programs");

  // Set programs
  const programs = data?.map((program) => ({
    value: program.program_name,
    label: program.program_name,
  })); */

  // Function to submit form
  const onSubmit = () => {
    console.log(firstName);
  };

  return (
    <Form method={method} onSubmit={onSubmit}>
      <Heading
        level={4}
        text={"Student Information"}
        className="border-l-4 rounded-lg border-blue-700 px-3"
      />

      <div className="flex flex-col">
        <Grid column="3" className="gap-2 mt-4">
          <TextFormField
            labelColor=""
            label="First Name"
            name="first_name"
            placeholder="Enter your first name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextFormField
            label="Middle Name"
            name="middle_name"
            placeholder="Enter your middle name"
          />
          <TextFormField
            label="Last Name"
            name="last_name"
            placeholder="Enter your last name"
          />
        </Grid>

        <div className="flex items-start space-x-4 mt-3">
          <TextFormField label={"Age"} name={"age"} />

          <div className="flex items-center ring-offset-2 focus:ring-2 ring-blue-400/50">
            <TextFormField
              className="rounded-l-md border-r-2 p-3"
              label={"Day"}
              name={"day"}
            />
            <TextFormField
              className="border-r-2 p-3"
              label={"Month"}
              name={"month"}
            />
            <TextFormField
              className="rounded-r-md p-3"
              label={"Year"}
              name={"year"}
            />
          </div>
        </div>

        <Grid column="3" className="gap-2 mt-3">
          <TextFormField
            labelColor=""
            label="Contact Email"
            name="contact_email"
            placeholder="Enter your contact Email"
          />
          <TextFormField
            label="Phone Number"
            name="phone_number"
            placeholder="Enter your phone number"
          />
          <TextFormField label="ID" name="id" placeholder="Enter your iD" />
        </Grid>

        <Select
          options={genders}
          className="mt-3 p-3 border rounded-md"
          label={"Gender"}
        />

        {loading ? (
          ""
        ) : (
          <Select
            options={programs}
            className="mt-3 p-3 border rounded-md"
            label={"programs"}
          />
        )}

        {/* Add Program selec option here */}
      </div>
    </Form>
  );
}
