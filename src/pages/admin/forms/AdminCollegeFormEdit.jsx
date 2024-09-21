import React, { useEffect, useState } from "react";
import { getRequest } from "../../../api/apiHelpers";
import Heading from "../../../components/common/Heading";
import FormField from "../../../components/common/FormField";
import { Input } from "@headlessui/react";

const AdminCollegeFormEdit = ({ selectedCollegeId, setIsEditOpen }) => {
  const [name, setName] = useState();

  useEffect(() => {
    const getCollege = async () => {
      const response = await getRequest({
        url: `/api/v1/admin/colleges/${selectedCollegeId}`,
      });

      // Set States
      setName(response.name);
    };

    getCollege();
  });

  const handleSubmit = async () => {
    // Ready Payload
    const payload = { name };
    // Request
    // Close
    setIsEditOpen(false);
  };

  return (
    <>
      {/* College Information Fields */}
      <form onSubmit={handleSubmit}>
        <div>
          <Heading
            level={5}
            color="black"
            text={"College Information"}
            className="border-l-2 rounded-lg border-blue-700 px-3 font-bold text-md"
          />
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-2 mt-4">
              <FormField
                label={"College Name"}
                name={"college_name"}
                labelClassName="text-sm text-black font-semibold"
                required
              >
                <Input
                  type="text"
                  className="outline-none text-black rounded-sm p-2 text-sm"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="College Name"
                  value={name}
                  required
                />
              </FormField>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminCollegeFormEdit;
