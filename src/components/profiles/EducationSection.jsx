import React from "react";
import SectionCard from "./SectionCard";
import { Button, Input } from "@headlessui/react";
import { Check, Edit3, Trash2, X } from "lucide-react";
import { formatDateOnly } from "../../utils/formatDate";
import Text from "../common/Text";

const EducationSection = ({
  title = "Educations",
  educations = [],
  editingEducationData,
  setEditingEducationData,
  saveEditEducation,
  cancelEditEducation,
  deleteEducation,
  handleEditEducation,
  newEducation,
  setNewEducation,
  addEducation,
  editingEducation,
}) => {
  return (
    <SectionCard title={title}>
      <ul className="space-y-2">
        {educations.map((education) => (
          <li
            key={education.id}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            {editingEducation === education.id ? (
              <>
                <Input
                  type="text"
                  value={editingEducationData.school_name}
                  onChange={(e) =>
                    setEditingEducationData((prev) => ({
                      ...prev,
                      school_name: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />
                <Input
                  type="text"
                  value={editingEducationData.full_address}
                  onChange={(e) =>
                    setEditingEducationData((prev) => ({
                      ...prev,
                      full_address: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />
                <Input
                  type="date"
                  value={editingEducationData.start_date}
                  onChange={(e) =>
                    setEditingEducationData((prev) => ({
                      ...prev,
                      start_date: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />
                <Input
                  type="date"
                  value={editingEducationData.end_date}
                  onChange={(e) =>
                    setEditingEducationData((prev) => ({
                      ...prev,
                      end_date: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />
                <div className="flex space-x-2">
                  <Button onClick={saveEditEducation}>
                    <Check className="text-green-600" />
                  </Button>
                  <Button onClick={cancelEditEducation}>
                    <X className="text-red-600" />
                  </Button>
                  <Button onClick={() => deleteEducation(education.id)}>
                    <Trash2 className="text-red-700" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/3">
                  <Text className="text-sm font-semibold text-gray-900">
                    {education.school_name}
                  </Text>
                </div>

                <div className="w-1/3">
                  <Text className="text-gray-600 text-sm">
                    {education.full_address}
                  </Text>
                </div>
                <div className="w-1/3 flex items-center">
                  <Text className="text-gray-600 text-sm">
                    {formatDateOnly(education.start_date)} - <br />
                    {formatDateOnly(education.end_date)}
                  </Text>
                </div>
                <Button
                  onClick={() => handleEditEducation(education)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <Edit3 className="w-5 h-5" />
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
      {console.log(newEducation)}
      <div className="space-y-3">
        {Object.keys(newEducation).map((key) => (
          <Input
            key={key}
            type={
              key.includes("date")
                ? "date"
                : key === "full_address"
                ? "text"
                : "text"
            }
            placeholder={key.replace(/_/g, " ").toUpperCase()}
            value={newEducation[key]}
            onChange={(e) =>
              setNewEducation((prev) => ({
                ...prev,
                [key]: e.target.value,
              }))
            }
            className="border rounded p-2 w-full"
          />
        ))}
        <Button
          onClick={addEducation}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm"
        >
          Add Education
        </Button>
      </div>
    </SectionCard>
  );
};

export default EducationSection;
