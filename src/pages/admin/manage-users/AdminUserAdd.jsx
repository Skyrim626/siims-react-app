// Libraries
import React, { useState } from "react";

// Icons
import { X } from "lucide-react";

// Components (Common)
import Section from "../../../components/common/Section";
import Heading from "../../../components/common/Heading";
import Button from "../../../components/common/Button";

// Forms
import StudentForm from "../forms/StudentForm";
import ChairpersonForm from "../../../components/organisms/forms/ChairpersonForm";

// Configure User buttons
const buttons = [
  {
    type: "student",
    label: "Add Student",
  },
  {
    type: "chairperson",
    label: "Add Chairperson",
  },
  {
    type: "dean",
    label: "Add Dean",
  },
];

// AdminUserAdd Page Component
export default function AdminUserAdd() {
  const [selectedUserType, setSelectedUserType] = useState(null);

  // Redners a form
  const renderForm = () => {
    switch (selectedUserType) {
      case "student":
        return <StudentForm />;
      case "chairperson":
        return <ChairpersonForm />;
      // Add a case for DeanForm if you create it
      default:
        return <p>Please select a user type to add.</p>;
    }
  };

  return (
    <>
      <Section>
        <div className="flex justify-between items-center">
          <div>
            <Heading level={2} text={"Users"} />
            <p className="text-blue-950">Add different types of users</p>
          </div>
          <Button
            isLink
            to="/admin/users"
            className="transition p-2 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent bg-red-500 hover:bg-red-600"
          >
            <X size={25} />
          </Button>
        </div>
        <hr className="my-3" />
      </Section>

      <Section>
        <div className="flex space-x-4 mb-4">
          {buttons.map((button, index) => {
            return (
              <Button
                key={index}
                className={`rounded-md p-3 font-bold text-white bg-blue-600 ${
                  selectedUserType === button.type
                    ? "bg-blue-800"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => setSelectedUserType(button.type)}
              >
                {button.label}
              </Button>
            );
          })}
        </div>

        {/* Render a form */}
        {renderForm()}
      </Section>
    </>
  );
}
