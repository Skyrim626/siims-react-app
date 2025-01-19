import React from "react";
import Text from "../common/Text";
import { Select } from "@headlessui/react";

const AssignStudentForm = ({
  selectedCoordinatorID = "",
  handleSelectedCoordinatorID,
  coordinators = [],
  disabled = false,
}) => {
  return (
    <div className="space-y-4">
      <Text>Select a coordinator to assign students:</Text>
      <Select
        name="coordinatorID"
        className="border rounded px-4 py-2 w-full"
        value={selectedCoordinatorID}
        onChange={handleSelectedCoordinatorID}
      >
        <option value="">-- Select Coordinator --</option>
        {coordinators.map((coordinator) => (
          <option key={coordinator.id} value={coordinator.id}>
            {coordinator.name}
          </option>
        ))}
      </Select>

      {/* <div className="mt-4">
        <Text className="font-semibold">Selected Student IDs:</Text>
        {selectedIds.size > 0 ? (
          <ul className="list-disc ml-6 mt-2">
            {Array.from(selectedIds).map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        ) : (
          <Text className="text-gray-500">No students selected.</Text>
        )}
      </div> */}
    </div>
  );
};

export default AssignStudentForm;
