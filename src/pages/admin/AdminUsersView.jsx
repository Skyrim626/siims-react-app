import React, { useState } from "react";
import Section from "../../components/atoms/Section";
import Heading from "../../components/atoms/Heading";
import Button from "../../components/atoms/Button";
import { Download, UserRoundPlus } from "lucide-react";
import DynamicTable from "../../components/organisms/DynamicTable";
import data from "../../data/data";
import Table from "../../components/organisms/Table";

// Users View for Admin Page
export default function AdminUsersView() {
  let [isOpen, setIsOpen] = useState(false);

  // Handles Open Modal
  const handleClickOpen = () => {
    setIsOpen(true);
  };

  // Handles Modal Close
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Section className="mt-4">
        <div className="flex justify-between items-center">
          <div>
            <Heading level={2} text={"Users"} />
            <p className="text-blue-950">Manage different types of users</p>
          </div>
          <div className="button-group | flex gap-2">
            <Button className="transition p-3 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
              <Download size={20} />
              <p>Export</p>
            </Button>
            <Button
              isLink
              to="/admin/users/add"
              onClick={handleClickOpen}
              className="transition py-3 px-5 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent bg-blue-500 hover:bg-blue-600"
            >
              <UserRoundPlus size={20} />
              <p>Add New User</p>
            </Button>
          </div>
        </div>
        <hr className="my-3" />
      </Section>

      {/* Table */}
      <Section>
        <Table
          data={data}
          filterLabels={["All"]}
          enableFilterDropDown
          enableMarkApprove
          enableMarkDelete
          enableSearch
        />
      </Section>

      <Section>
        <DynamicTable
          data={data}
          enableDelete
          enableFilters
          enableSearch
          filterLabels={[
            "All",
            "Dean",
            "Chairperson",
            "Coordinator",
            "Company",
            "OSA",
            "Student",
            "Supervisor",
            "Work Provider",
          ]}
          itemsPerPage={10}
          enableActions
        />
      </Section>
    </>
  );
}
