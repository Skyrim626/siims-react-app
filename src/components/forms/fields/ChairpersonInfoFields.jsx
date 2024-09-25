import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import FormField from "../../common/FormField";
import { getRequest } from "../../../api/apiHelpers";
import { Select } from "@headlessui/react";

const ChairpersonInfoFields = ({
  chairpersonInfo,
  handleChairpersonInfo,
  requiredFields = {
    program_id: true,
  },
}) => {
  // State
  const [programs, setPrograms] = useState([]);

  // Load Programs
  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await getRequest({
        url: "/api/v1/admin/programs",
      });

      // Set programs
      setPrograms(response);
    };

    // Call
    fetchPrograms();
  });

  return (
    <>
      {/*  Chairperson Information */}
      <div>
        <Heading
          level={5}
          color="black"
          text={"Chairperson Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"Programs"}
              name={"program_id"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["program_id"]}
            >
              <Select
                name="program_id"
                className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none px-2 py-2"
                aria-label="program_id"
                onClick={handleChairpersonInfo}
                required={requiredFields["program_id"]}
              >
                <option value="">-Select a Program-</option>
                {programs.length !== 0 &&
                  programs.map((program) => (
                    <option
                      className={`${program.chairperson_id && "text-red-500"}`}
                    >
                      {program.name}{" "}
                      {program.chairperson_id && (
                        <span>Occupied by: {program.chairperson_id}</span>
                      )}
                    </option>
                  ))}
              </Select>
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChairpersonInfoFields;
