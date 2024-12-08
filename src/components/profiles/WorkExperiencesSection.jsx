import React from "react";
import SectionCard from "./SectionCard";
import { Button, Input } from "@headlessui/react";
import { Check, Trash2, X, Edit3 } from "lucide-react";
import { formatDateOnly } from "../../utils/formatDate";
import Text from "../common/Text";

const WorkExperiencesSection = ({
  title = "Work Experiences ",
  workExperiences = [],
  editingData,
  setEditingData,
  saveEdit,
  cancelEdit,
  deleteWorkExperience,
  handleEdit,
  newWork,
  setNewWork,
  addWorkExperience,
  editingWork,
}) => {
  return (
    <SectionCard title={title}>
      <ul className="space-y-2">
        {workExperiences.map((work) => (
          <li
            key={work.id}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            {editingWork === work.id ? (
              <>
                <Input
                  type="text"
                  value={editingData.company_name}
                  onChange={(e) =>
                    setEditingData((prev) => ({
                      ...prev,
                      company_name: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />
                <Input
                  type="text"
                  value={editingData.job_position}
                  onChange={(e) =>
                    setEditingData((prev) => ({
                      ...prev,
                      job_position: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />
                <Input
                  type="text"
                  value={editingData.full_address}
                  onChange={(e) =>
                    setEditingData((prev) => ({
                      ...prev,
                      full_address: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />

                <Input
                  type="date"
                  value={editingData.start_date}
                  onChange={(e) =>
                    setEditingData((prev) => ({
                      ...prev,
                      start_date: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />
                <Input
                  type="date"
                  value={editingData.end_date}
                  onChange={(e) =>
                    setEditingData((prev) => ({
                      ...prev,
                      end_date: e.target.value,
                    }))
                  }
                  className="w-1/3"
                />
                <div className="flex space-x-2">
                  <Button onClick={saveEdit}>
                    <Check className="text-green-600" />
                  </Button>
                  <Button onClick={cancelEdit}>
                    <X className="text-red-600" />
                  </Button>
                  <Button onClick={() => deleteWorkExperience(work.id)}>
                    <Trash2 className="text-red-700" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/3">
                  <Text className="text-sm font-semibold text-gray-900">
                    {work.company_name}
                  </Text>
                </div>
                <div className="w-1/3">
                  <Text className="text-gray-600 text-sm">
                    {work.job_position}
                  </Text>
                </div>
                <div className="w-1/3">
                  <Text className="text-gray-600 text-sm">
                    {work.full_address}
                  </Text>
                </div>
                <div className="w-1/3 flex items-center">
                  <Text className="text-gray-600 text-sm">
                    {formatDateOnly(work.start_date)} - <br />
                    {formatDateOnly(work.end_date)}
                  </Text>
                </div>
                <Button
                  onClick={() => handleEdit(work)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <Edit3 className="w-5 h-5" />
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="space-y-3">
        {Object.keys(newWork).map((key) => (
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
            value={newWork[key]}
            onChange={(e) =>
              setNewWork((prev) => ({
                ...prev,
                [key]: e.target.value,
              }))
            }
            className="border rounded p-2 w-full"
          />
        ))}
        <Button
          onClick={addWorkExperience}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm"
        >
          Add Work Experience
        </Button>
      </div>
    </SectionCard>
  );
};

export default WorkExperiencesSection;
