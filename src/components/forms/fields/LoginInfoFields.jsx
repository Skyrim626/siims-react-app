import React from "react";
import Heading from "../../common/Heading";
import { generateID, generatePassword } from "../../../utils/generator";
import { Button, Field, Input, Label } from "@headlessui/react";
import Text from "../../common/Text";

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
const LoginInfoFields = ({
  info = {
    id: "",
    password: "",
  },
  handleInfoChange,
  allowGenerateId = true,
  allowedFields = {
    id: true,
    password: true,
  },
  requiredFields = {
    id: true,
    password: true,
  },
  errors = {},
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
        {allowedFields.id && (
          <div>
            <Field>
              <Label>
                ID{" "}
                {requiredFields["id"] && (
                  <span className="text-red-600 font-bold">*</span>
                )}{" "}
              </Label>
              <div className="flex items-center">
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm bg-gray-300 h-full"
                  name="id"
                  /* onChange={(e) =>
                handleInfoChange({
                  target: { name: "id", value: e.target.value },
                })
              } */
                  onChange={handleInfoChange}
                  placeholder="ID"
                  value={info.id}
                  // readOnly
                />
                {allowGenerateId && (
                  <Button
                    type="button"
                    className="py-1 bg-blue-700 transition duration-150 hover:bg-blue-800 h-full px-2 text-white font-semibold rounded-e-sm"
                    /* onClick={() => setId(generateID())} */
                    onClick={() =>
                      handleInfoChange({
                        target: { name: "id", value: generateID() },
                      })
                    }
                  >
                    Generate ID
                  </Button>
                )}
              </div>
            </Field>

            {errors.id && <Text className="text-red-500">{errors.id[0]}</Text>}
          </div>
        )}

        {allowedFields.password && (
          <div>
            <Field>
              <Label>
                Password{" "}
                {requiredFields["password"] && (
                  <span className="text-red-600 font-bold">*</span>
                )}
              </Label>
              <div className="flex items-center">
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="password"
                  // onChange={(e) => handleInfoChange(e.target.value)}
                  onChange={handleInfoChange}
                  placeholder="Password"
                  value={info.password}
                />
                <Button
                  type="button"
                  className="py-1 bg-blue-700 whitespace-nowrap transition duration-150 hover:bg-blue-800 h-full px-2 text-white font-semibold rounded-e-sm"
                  onClick={() =>
                    handleInfoChange({
                      target: { name: "password", value: generatePassword(12) },
                    })
                  }
                >
                  Generate Password
                </Button>
              </div>
            </Field>
            {errors.password && (
              <Text className="text-red-500">{errors.password[0]}</Text>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default LoginInfoFields;
