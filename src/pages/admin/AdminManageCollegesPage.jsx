import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import { getRequest, postRequest } from "../../api/apiHelpers";
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

const AdminManageCollegesPage = () => {
  // Form State
  const [name, setName] = useState();

  // States
  const [colleges, setColleges] = useState([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState();

  // Open Modal Form
  const [isOpen, setIsOpen] = useState(false);
  // Edit Modal Form
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { handleSubmit, loading, errors } = useSubmitForm({
    setState: setColleges,
    setIsOpen: setIsOpen,
  });

  // On Submit
  const onSubmit = async (e) => {
    e.preventDefault();

    handleSubmit({ payload: { name }, url: "/api/v1/admin/colleges" });
  };

  // Handle Edit
  const handleEdit = (id) => {
    setSelectedCollegeId(id);
    setIsEditOpen(!isEditOpen);
  };

  // Fetch Colleges
  useEffect(() => {
    const fetchColleges = async () => {
      const response = await getRequest({
        url: "/api/v1/admin/colleges",
      });

      // Set
      setColleges(response);
    };

    // Call
    fetchColleges();
  }, []);

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

      {colleges.length !== 0 && (
        <Table data={colleges} handleEdit={handleEdit} />
      )}

      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add College"
        onSubmit={onSubmit}
      >
        <AdminCollegeFormAdd
          states={{
            name: name,
          }}
          setStates={{
            setName: (e) => setName(e.target.value),
          }}
          errors={errors}
        />
      </FormModal>

      <AnimatePresence>
        {isEditOpen && (
          <Modal
            modalTitle="Edit Dean"
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
          >
            <AdminCollegeFormEdit
              selectedCollegeId={selectedCollegeId}
              setIsEditOpen={setIsEditOpen}
            />
          </Modal>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default AdminManageCollegesPage;
