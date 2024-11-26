import React, { useState } from "react";
import { Dialog } from "@headlessui/react"; // For modal

const AssignStudentModal = ({ isOpen, setIsOpen, students, handleAssign }) => {
  const [selectedStudent, setSelectedStudent] = useState(""); // Track selected student ID

  const handleAssignClick = () => {
    if (selectedStudent) {
      handleAssign(selectedStudent); // Call the handleAssign function with selected student
      setIsOpen(false); // Close the modal after assigning
    } else {
      alert("Please select a student."); // Alert if no student is selected
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />{" "}
      {/* Modal backdrop */}
      <Dialog.Panel className="bg-white rounded-lg p-6 w-96 max-w-full">
        <Dialog.Title className="text-xl font-bold">
          Assign Student
        </Dialog.Title>
        <Dialog.Description className="mt-2">
          Select a student to assign:
        </Dialog.Description>

        <div className="mt-4">
          {/* Use standard HTML <select> element */}
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} {/* Display student's name */}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setIsOpen(false)} // Close modal without action
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignClick} // Assign the student when clicked
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Assign
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AssignStudentModal;
