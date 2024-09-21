import React from "react";
import Heading from "../common/Heading";
import { generateID, generatePassword } from "../../utils/generator";
import { Button, Field, Input, Label } from "@headlessui/react";
import FormField from "../common/FormField";

/**
 * Fields:
 * - ID
 * - Password
 *
 * Features:
 * - Generate ID
 * - Generate Password
 *
 * @param {*} param0
 * @returns
 */
const IDPasswordInfoFields = ({
  id,
  setId,
  password,
  setPassword,
  requiredFields = {
    id: true,
    password: true,
  },
}) => (
  <div>
    <Heading
      level={5}
      color="black"
      text={"Login Information"}
      className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
    />

    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2 mt-4">
        <Field>
          <Label>ID {requiredFields["id"] && <span>*</span>} </Label>
          <div className="flex items-center">
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm bg-gray-300 h-full"
              name="id"
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
              value={id}
              readOnly
            />
            <Button
              type="button"
              className="py-1 bg-blue-700 transition duration-150 hover:bg-blue-800 h-full px-2 text-white font-semibold rounded-e-sm"
              onClick={() => setId(generateID())}
            >
              Generate ID
            </Button>
          </div>
        </Field>

        <Field>
          <Label>
            Password {requiredFields["password"] && <span>*</span>}{" "}
          </Label>
          <div className="flex items-center">
            <Input
              type="text"
              className="outline-none text-black rounded-sm p-2 text-sm"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              value={password}
            />
            <Button
              type="button"
              className="py-1 bg-blue-700 whitespace-nowrap transition duration-150 hover:bg-blue-800 h-full px-2 text-white font-semibold rounded-e-sm"
              onClick={() => setPassword(generatePassword(12))}
            >
              Generate Password
            </Button>
          </div>
        </Field>
      </div>
    </div>
  </div>
);

export default IDPasswordInfoFields;
