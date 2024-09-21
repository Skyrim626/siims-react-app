import React, { useEffect, useState } from "react";
import Section from "../../../../components/common/Section";
import { Button } from "@headlessui/react";
import { FileDown, FileUp, UserRoundPlus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../../components/common/Modal";
import DeanFormAdd from "../../forms/DeanFormAdd";
import { deleteRequest, getRequest } from "../../../../api/apiHelpers";
import AdminDeanTable from "../../../../components/tables/AdminDeanTable";
import useToastOnReload from "../../../../hooks/useToastOnReload";
import DeanFormEdit from "../../forms/DeanFormEdit";

// Admin Manage Deans Page
const AdminManageDeansPage = () => {
  // load toast
  useToastOnReload();

  /**
   * States
   */
  const [selectedDeanId, setSelectedDeanId] = useState();
  const [deans, setDeans] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  // Load Dean
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Dean
      const deanResponse = await getRequest({
        url: "/api/v1/admin/users/deans",
      });

      console.log(deanResponse);

      // Set Deans
      setDeans(deanResponse);

      // Fetch College
      const collegeResponse = await getRequest({
        url: "/api/v1/admin/colleges",
      });

      // Set Colleges
      setColleges(collegeResponse);
    };

    fetchData();
  }, []);

  // Archive
  const handleArchive = async (id) => {
    // Archive Dean
    const response = await deleteRequest({
      url: `/api/v1/admin/users/deans/${id}`,
    });

    // Check response
    if (response.status === 200) {
      // reload window
      // Reload the page to display new data
      window.location.reload();
    }
  };

  // Archive All
  const handleArchiveBySelectedIds = async (selectedIds) => {
    // Request
    const request = {
      url: "/api/v1/admin/users/deans/archive",
      data: { ids: Array.from(selectedIds) },
    };

    // Archive Dean
    const response = await deleteRequest(request);

    // Check status
    if (response.status === 200) {
      window.location.reload();
    }
  };

  // Handle Edit
  const handleEdit = (id) => {
    // Set to true -- Open Edit Form
    setSelectedDeanId(id);
    setIsOpenEdit(true);
  };

  return (
    <Section>
      <div className="flex justify-end items-center">
        <div className="button-group | flex gap-2">
          <Button className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
            <FileUp size={15} />
            <p>Export</p>
          </Button>
          <Button className="transition text-sm px-3 py-1 font-bold flex items-center justify-center gap-2 border-2 rounded-lg border-blue-950 hover:bg-blue-950 hover:text-white">
            <FileDown size={15} />
            <p>Import</p>
          </Button>
          <Button
            onClick={() => setIsOpen(true)}
            className={`transition text-sm py-1 px-3 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent ${
              isOpen ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            <UserRoundPlus size={15} />
            <p>Add New Dean</p>
          </Button>
        </div>
      </div>

      {deans.length !== 0 && colleges.length !== 0 && (
        <AdminDeanTable
          data={deans}
          collegesForFilter={colleges}
          handleArchive={handleArchive}
          handleArchiveBySelectedIds={handleArchiveBySelectedIds}
          handleEdit={handleEdit}
        />
      )}

      {deans && colleges.length !== 0 && (
        <AnimatePresence>
          {isOpen && (
            <Modal
              modalTitle="Create Dean"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            >
              <DeanFormAdd
                setIsOpen={setIsOpen}
                deans={deans}
                colleges={colleges}
                setDeans={setDeans}
              />
            </Modal>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {isOpenEdit && (
          <Modal
            modalTitle="Edit Dean"
            isOpen={isOpenEdit}
            setIsOpen={setIsOpenEdit}
          >
            <DeanFormEdit
              selectedDeanId={selectedDeanId}
              isOpen={isOpenEdit}
              setIsOpen={setIsOpenEdit}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default AdminManageDeansPage;
