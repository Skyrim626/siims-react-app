import React from "react";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input, Select } from "@headlessui/react";

const AdminProgramFormEdit = ({
  selectedProgram,
  editProgramInfo,
  handleEditProgramInfoChange,
  requiredFields = {
    name: true,
    college_id: true,
    chairpeson_id: false,
  },
  colleges = [],
  chairpersons = [],
}) => {
  console.log(chairpersons);

  return (
    <>
      {/* Program Information Fields */}
      <div>
        <Heading
          level={5}
          color="black"
          text={"Program Information"}
          className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-3 gap-2 mt-4">
            <FormField
              label={"Program Name"}
              name={"name"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["name"]}
            >
              <Input
                type="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="name"
                onChange={handleEditProgramInfoChange}
                placeholder="Program Name"
                value={editProgramInfo.name}
                required={requiredFields["name"]}
              />
            </FormField>

            <FormField
              label={"College"}
              name={"college_id"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["college_id"]}
            >
              <Select
                typeof="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="college_id"
                onChange={handleEditProgramInfoChange}
                value={editProgramInfo.college_id}
                required={requiredFields["college_id"]}
              >
                <option value="">-Select a College-</option>
                {colleges.map((college) => {
                  return (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  );
                })}
              </Select>
            </FormField>

            <FormField
              label={"Chairperson Assign"}
              name={"chairperson_id"}
              labelClassName="text-sm text-black font-semibold"
              required={requiredFields["chairperson_id"]}
            >
              <Select
                typeof="text"
                className="outline-none text-black rounded-sm p-2 text-sm"
                name="chairperson_id"
                onChange={handleEditProgramInfoChange}
                value={editProgramInfo.chairperson_id}
                required={requiredFields["chairperson_id"]}
              >
                <option value="">-Assign a Chairperson-</option>
                {chairpersons.map((chairperson) => {
                  return (
                    <option key={chairperson.id} value={chairperson.id}>
                      {`${chairperson.first_name} ${chairperson.middle_name} ${chairperson.last_name}`}
                    </option>
                  );
                })}
              </Select>
            </FormField>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProgramFormEdit;
