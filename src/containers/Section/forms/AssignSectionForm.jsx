import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Button, Select } from "@headlessui/react";

const AssignSectionForm = ({
  selectedSectionID,
  setSelectedSectionID,
  sections = [],
  assignSection,
}) => {
  // console.log(sections);

  console.log(selectedSectionID);

  return (
    <form method="post" onSubmit={assignSection}>
      <Heading
        level={5}
        color="black"
        text={"Your Sections"}
        className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
      />

      <div className="flex flex-col mt-5">
        <FormField
          label={"Assign Section"}
          name={"program_id"}
          labelClassName="text-sm text-black font-semibold"
          required={true}
        >
          <Select
            name="program_id"
            className="border data-[hover]:shadow data-[focus]:bg-blue-100 h-full outline-none p-2"
            aria-label="Select program"
            value={selectedSectionID}
            onChange={(e) => setSelectedSectionID(e.target.value)}
          >
            {sections.map((section, index) => (
              <option key={index} value={section.id}>
                {section.name}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="mt-3">
        <Button
          type="submit"
          className="w-full text-white font-semibold text-sm py-2 px-3 text-center bg-blue-500 hover:bg-blue-600 transition"
        >
          Assign
        </Button>
      </div>
    </form>
  );
};

export default AssignSectionForm;
