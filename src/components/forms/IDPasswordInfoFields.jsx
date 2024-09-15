import React from "react";
import Heading from "../common/Heading";
import { generateID, generatePassword } from "../../utils/generator";
import { Button } from "@headlessui/react";

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
const IDPasswordInfoFields = ({ id, setId, password, setPassword }) => (
  <div>
    <Heading
      level={5}
      color="black"
      text={"Login Information"}
      className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
    />

    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="flex items-center">
          <input
            type="text"
            className="outline-none text-black rounded-sm p-2 text-sm bg-gray-300"
            name="id"
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            value={id}
            readOnly
          />
          <Button
            type="button"
            className="bg-blue-700 transition duration-150 hover:bg-blue-800 h-full px-2 text-white font-semibold rounded-e-sm"
            onClick={() => setId(generateID())}
          >
            Generate ID
          </Button>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            className="outline-none text-black rounded-sm p-2 text-sm"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
          />
          <Button
            type="button"
            className="bg-blue-700 whitespace-nowrap transition duration-150 hover:bg-blue-800 h-full px-2 text-white font-semibold rounded-e-sm"
            onClick={() => setPassword(generatePassword(12))}
          >
            Generate Password
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default IDPasswordInfoFields;
