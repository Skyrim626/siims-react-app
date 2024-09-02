// Libraries
import React, { useState } from "react";
import { Form } from "react-router-dom";

// Components (Common)
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import Button from "../common/Button";

/* import { genders } from "../../../config/options"; */

export default function StudentForm({ method = "post", ...props }) {
  // States for Student Form
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");

  // Calculate Age
  const calculateAge = (date) => {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Handle Date Change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBirthDate(selectedDate);
    const calculatedAge = calculateAge(selectedDate);
    setAge(calculatedAge);
  };

  // Function to submit form
  const onSubmit = () => {
    console.log(
      firstName,
      middleName,
      lastName,
      email,
      age,
      birthDate,
      phoneNumber,
      id,
      gender,
      department,
      course
    );
  };

  return (
    <Form method={method} onSubmit={onSubmit} action="/users/create">
      <Heading
        level={4}
        color="black"
        text={"Student Information"}
        className="border-l-4 rounded-lg border-blue-700 px-3"
      />

      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-2 mt-4">
          <FormField
            label={"First Name"}
            name={"first_name"}
            labelClassName="text-md text-black"
          >
            <input
              type="text"
              className="outline-none text-black rounded-md p-3"
              name="first_name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="First name"
              value={firstName}
            />
          </FormField>

          <FormField
            label={"Middle Name"}
            name={"middle_name"}
            labelClassName="text-md text-black"
          >
            <input
              type="text"
              className="outline-none text-black rounded-md p-3"
              name="middle_name"
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
              placeholder="Middle name"
              value={middleName}
            />
          </FormField>
          <FormField
            label={"Last Name"}
            name={"last_name"}
            labelClassName="text-md text-black"
          >
            <input
              type="text"
              className="outline-none text-black rounded-md p-3"
              name="last_name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last name"
              value={lastName}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <FormField
            label={"Age"}
            name={"age"}
            labelClassName="text-md text-black"
          >
            <input
              type="text"
              className="outline-none text-black rounded-md p-3"
              name="age"
              placeholder="Age"
              value={age}
              readOnly
            />
          </FormField>

          <FormField
            label={"Birth Date"}
            name={"birthdate"}
            labelClassName="text-md text-black"
          >
            <input
              type="date"
              className="outline-none text-black rounded-md p-3"
              name="birthdate"
              onChange={handleDateChange}
              placeholder="YYYY-MM-DD"
              value={birthDate}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <FormField
            label={"Email"}
            name={"email"}
            labelClassName="text-md text-black"
          >
            <input
              type="email"
              className="outline-none text-black rounded-md p-3"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              value={email}
            />
          </FormField>

          <FormField
            label={"Phone Number"}
            name={"phone_number"}
            labelClassName="text-md text-black"
          >
            <input
              type="text"
              className="outline-none text-black rounded-md p-3"
              name="phone_number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="Phone number"
              value={phoneNumber}
            />
          </FormField>

          <FormField
            label={"ID"}
            name={"id"}
            labelClassName="text-md text-black"
          >
            <input
              type="text"
              className="outline-none text-black rounded-md p-3"
              name="id"
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="ID"
              value={id}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <FormField label={"Gender"} labelSize={"small"} labelColor={"gray"}>
            {/* <Select
              options={genders}
              className="mt-3 p-3 border rounded-md"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            /> */}
          </FormField>

          {/* Add Program selec option here */}

          <FormField label={"Programs"} labelSize={"small"} labelColor={"gray"}>
            {/* <Select
              options={programs}
              className="mt-3 p-3 border rounded-md"
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            /> */}
          </FormField>
        </div>

        <div className="flex justify-end items-end mt-3">
          <Button
            type="button"
            className="py-3 px-4 rounded-md font-bold text-white transition duration-300 bg-blue-600 hover:bg-blue-700"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
}
