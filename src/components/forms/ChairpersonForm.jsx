import React from "react";
import LoginFields from "../fields/LoginFields";
import BasicInformationFields from "./fields/BasicInformationFields";
import Heading from "../common/Heading";
import { Select, Switch } from "@headlessui/react";
import FormField from "../common/FormField";

const ChairpersonForm = ({
  id,
  password,
  firstName,
  middleName,
  lastName,
  email,
  phoneNumber,
  programId,
  setId,
  setPassword,
  setFirstName,
  setMiddleName,
  setLastName,
  setEmail,
  setPhoneNumber,
  setProgramId,
  requiredFields = {
    id: false,
    password: false,
    firstName: false,
    middleName: false,
    lastName: false,
    phoneNumber: false,
    email: false,
    programId: false,
  },
  programs = [],
  errors,
  isCheckAllowCoordinator,
  setIsCheckAllowCoordinator,
}) => {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <LoginFields
          id={id}
          password={password}
          setId={setId}
          setPassword={setPassword}
        />

        {/* Allow Coordinator Creation Information */}

        <div className="mt-6">
          <Heading
            level={5}
            color="black"
            text={"Allow Coordinator"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />

          <div className="grid grid-cols-3 gap-4 mt-4">
            <Switch
              checked={isCheckAllowCoordinator}
              onChange={setIsCheckAllowCoordinator}
              className={`${
                isCheckAllowCoordinator ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  isCheckAllowCoordinator ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>

        <BasicInformationFields
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          email={email}
          phoneNumber={phoneNumber}
          setFirstName={setFirstName}
          setMiddleName={setMiddleName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          requiredFields={requiredFields}
          errors={errors}
        />

        {/* Program Assign */}
        <div className="mt-6">
          <Heading
            level={5}
            color="black"
            text={"Program Assign"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />
          <div className="mt-4">
            <FormField
              label={"Chairperson Assign"}
              name={"programId"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["programId"]}
            >
              <Select
                typeof="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="programId"
                onChange={(e) => {
                  setProgramId(e.target.value);
                }}
                value={programId}
                required={requiredFields["programId"]}
              >
                <option value="">-Program Assign-</option>
                {programs.map((program) => {
                  return (
                    <option key={program.id} value={program.id}>
                      {program.name} | {program.program}
                    </option>
                  );
                })}
              </Select>
              {errors.program_id && (
                <Text className="text-red-500">{errors.program_id[0]}</Text>
              )}
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChairpersonForm;
