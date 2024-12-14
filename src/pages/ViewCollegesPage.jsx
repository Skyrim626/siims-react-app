import React, { useMemo, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Page from "../components/common/Page";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Loader from "../components/common/Loader";
import useRequest from "../hooks/useRequest";
import ManageHeader from "../components/common/ManageHeader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Button } from "@headlessui/react";
import FormModal from "../components/modals/FormModal";
import CollegeForm from "../components/forms/CollegeForm";
import useForm from "../hooks/useForm";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

const ViewCollegesPage = () => {
  // Use Loader Data
  const { list_of_deans } = useLoaderData();
  // Navigate and Location
  const navigate = useNavigate();
  const location = useLocation();

  // Row state
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Select State
  const [selectedCollege, setSelectedCollege] = useState({});

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    collegeName: "",
    deanId: "",
  });

  /**
   * Use Request
   */
  const {
    errors: validationErrors,
    postData,
    putData,
    deleteData,
    loading,
  } = useRequest({
    setData: setRows,
    setIsOpen: setIsOpen,
  });

  /**
   * Function that adds new college
   */
  const addNewCollege = () => {
    // POST METHOD
    postData({
      url: "/colleges",
      payload: {
        name: formData.collegeName,
      },
      resetForm: resetForm,
    });
  };

  /**
   * Function that updates a college
   */
  const updateCollege = () => {
    putData({
      url: `/colleges/${selectedCollege["id"]}`,
      payload: {
        name: formData.collegeName,
        dean_id: formData.deanId,
      },
      selectedData: selectedCollege,
      setIsOpen: setIsEditOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedCollege(row);

    // Set Form Values
    setFormValues({
      collegeName: row.name,
    });

    // Open Edit Modal
    setIsEditOpen(true);
  };

  /**
   * Function that deletes a college
   */
  const deleteCollege = () => {
    // DELETE METHOD
    deleteData({
      url: `/colleges/${selectedCollege["id"]}`,
      id: selectedCollege["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedCollege(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 90,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "dean_id",
        headerName: "Dean ID",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "name",
        headerName: "College Name",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email",
        headerName: "Email",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "updated_at",
        headerName: "Updated At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "deleted_at",
        headerName: "Deleted At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
    ],
    []
  );

  // Action Column
  const actionColumn = useMemo(
    () => ({
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex space-x-2 items-center justify-center">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={() => handleEditModal(params.row)}
          >
            Edit
          </Button>

          {/* Delete is only allowed for Admin */}
          <Button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
            onClick={() => handleDeleteModal(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
      sortable: false, // Prevent sorting for the actions column
      filterable: false, // Prevent filtering for the actions column
    }),
    []
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text="Manage Colleges" />
        <Text className="text-md text-blue-950">
          This is where you manage the colleges.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New College"
        showExportButton={false}
        showImportButton={false}
      />

      <DynamicDataGrid
        searchPlaceholder={"Search Colleges"}
        rows={rows}
        setRows={setRows}
        columns={columns}
        url={"/colleges"}
      />

      {/* Form Modal */}
      {/* Add Form Modal */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add College"
        onSubmit={addNewCollege}
      >
        <CollegeForm
          collegeName={formData.collegeName}
          handleInputChange={handleInputChange}
          errors={validationErrors}
        />
      </FormModal>

      {/* Edit Form Modal */}
      <FormModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        modalTitle="Edit College"
        onSubmit={updateCollege}
      >
        <CollegeForm
          method="put"
          collegeName={formData.collegeName}
          deanId={formData.deanId}
          handleInputChange={handleInputChange}
          deans={list_of_deans}
          errors={validationErrors}
        />
      </FormModal>

      {/* Delete Form Modal */}
      <DeleteConfirmModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        title="Delete college"
        message="Are you sure you want to archive a college?"
        handleDelete={deleteCollege}
      />
    </Page>
  );
};

export default ViewCollegesPage;
