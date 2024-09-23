import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../../api/apiHelpers";
import Section from "../../components/common/Section";
import Text from "../../components/common/Text";
import Heading from "../../components/common/Heading";
import Table from "../../components/tables/Table";
import AdminManageHeader from "../../components/users/admin/AdminManageUserHeader";
import ChairpersonFormAdd from "./forms/ChairpersonFormAdd";
import FormModal from "../../components/modals/FormModal";
import AdminCollegeFormAdd from "./forms/AdminCollegeFormAdd";
import { showSuccessAlert } from "../../utils/toastify";
import useSubmitForm from "../../hooks/useSubmitForm";
import AdminCollegeFormEdit from "./forms/AdminCollegeFormEdit";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/common/Modal";
import useForm from "../../hooks/useForm";
import AdminCollegesTable from "../../components/users/admin/table/AdminCollegesTable";

const AdminManageCollegesPage = () => {
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Select State
  const [selectedCollege, setSelectedCollege] = useState(null);

  // Fetch State
  const [colleges, setColleges] = useState([]);

  // Form State
  // Using the custom hook for College Information (Add)
  const [collegeInfo, handleCollegeInfoChange] = useForm({
    name: "",
  });

  // Using the custom hook for College Information (Edit)
  const [editCollegeInfo, handleEditCollegeInfoChange] = useForm({
    name: "",
  });

  // Use Effect: Fetching Data
  useEffect(() => {
    // Method: fetchColleges
    const fetchColleges = async () => {
      const response = await getRequest({
        url: "/api/v1/admin/colleges",
      });
      // Set College State
      setColleges(response);
    };
    // Call Method: fetchColleges
    fetchColleges();
  }, []);

  // Handle Add Submit
  const handleAddSubmit = async () => {
    // Payload
    const payload = collegeInfo;

    // Send Request
    const response = await postRequest({
      url: "/api/v1/admin/colleges",
      data: payload,
    });

    // Reset Input
    handleCollegeInfoChange({
      target: { name: "name", value: "" },
    });

    // Set College State
    setColleges(response.data);
    // Close Modal
    setIsOpen(false);
  };

  // Handle Edit Submit
  const handleEditSubmit = async () => {
    // Ready Payload
    const payload = editCollegeInfo;

    // Send Request
    const response = await putRequest({
      url: `/api/v1/admin/colleges/${selectedCollege["id"]}`,
      data: payload,
    });

    // Reset Input
    handleEditCollegeInfoChange({
      target: { name: "name", value: "" },
    });

    // Set College State
    setColleges(response.data);

    // Close Edit Modal
    setEditIsOpen(false);
  };

  // Handle Edit Select College
  const handleEdit = (college) => {
    // Set College State
    setSelectedCollege(college);

    // Pre-fill the editCollegeInfo
    handleEditCollegeInfoChange({
      target: { name: "name", value: college.name },
    });

    // Open Modal
    setEditIsOpen(true);
  };

  // Handle Archive
  const handleArchive = async (id) => {
    // Send Request
    const response = await deleteRequest({
      url: `/api/v1/admin/colleges/archive/${id}`,
      method: "delete",
    });

    // Set College State
    setColleges(response.data);
  };

  // Handle Archive Selected Id's
  const handleArchiveBySelectedIds = async (selectedIds) => {
    // Ready Payload
    const payload = { ids: Array.from(selectedIds) };

    // Send Request
    const response = await deleteRequest({
      url: "/api/v1/admin/colleges/archive/selected",
      data: payload,
      method: "post",
    });

    // Set College State
    setColleges(response.data);
  };

  return (
    <Page>
      <Section>
        <Heading level={3} text={"Colleges"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the colleges.
        </Text>
        <hr className="my-3" />
      </Section>

      <AdminManageHeader
        addPlaceholder="Add New College"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Table */}
      {colleges.length !== 0 && (
        <AdminCollegesTable
          handleArchiveBySelectedIds={handleArchiveBySelectedIds}
          data={colleges}
          handleEdit={handleEdit}
          handleArchive={handleArchive}
        />
      )}

      {/* Form Modal */}
      {/* Add Form Modal */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add College"
        onSubmit={handleAddSubmit}
      >
        <AdminCollegeFormAdd
          collegeInfo={collegeInfo}
          handleCollegeInfoChange={handleCollegeInfoChange}
        />
      </FormModal>

      {/* Edit Form Modal */}
      {selectedCollege && (
        <FormModal
          isOpen={editIsOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit College"
          onSubmit={handleEditSubmit}
        >
          <AdminCollegeFormEdit
            role={selectedCollege}
            editCollegeInfo={editCollegeInfo}
            handleEditCollegeInfoChange={handleEditCollegeInfoChange}
          />
        </FormModal>
      )}
    </Page>
  );
};

export default AdminManageCollegesPage;
