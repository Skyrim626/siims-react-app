import React, { useCallback, useMemo, useState } from "react";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import Page from "../components/common/Page";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import ManageHeader from "../components/common/ManageHeader";
import FormModal from "../components/modals/FormModal";
import DocumentTypeForm from "../components/forms/DocumentTypeForm";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import Loader from "../components/common/Loader";
import { Button } from "@headlessui/react";
import { debounce } from "@mui/material";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

/**
 * Role Allowed: Admin, OSA
 */
const ViewDocumentTypePage = ({ authorizeRole }) => {
  // Row state
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Select State
  const [selectedDocumentType, setSelectedDocumentType] = useState({});

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    documentTypeName: "",
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
   * Function that adds a new document type
   */
  const addDocumentType = () => {
    // Ready Payload
    const payload = {
      name: formData.documentTypeName,
    };

    // POST METHOD
    postData({
      url: "/document-types",
      payload: payload,
      resetForm: resetForm,
    });
  };

  /**
   * Function that updates a document type
   */
  const updateDocumentType = () => {
    // UPDATE METHOD
    putData({
      url: `/document-types/${selectedDocumentType["id"]}`,
      payload: {
        name: formData.documentTypeName,
      },
      selectedData: selectedDocumentType,
      setIsOpen: setIsEditOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // console.log(row);

    // Set Select
    setSelectedDocumentType(row);

    // Set Values
    setFormValues({
      documentTypeName: row.name,
    });

    // Open Edit Modal
    setIsEditOpen(true);
  };

  /**
   * Function that deletes a document type
   */
  const deleteDocumentType = () => {
    // DELETE METHOD
    deleteData({
      url: `/document-types/${selectedDocumentType["id"]}`,
      id: selectedDocumentType["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select
    setSelectedDocumentType(row);

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
        field: "name",
        headerName: "Document Type",
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
          {authorizeRole === "admin" && (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
              onClick={() => handleDeleteModal(params.row)}
            >
              Delete
            </Button>
          )}
        </div>
      ),
      sortable: false, // Prevent sorting for the actions column
      filterable: false, // Prevent filtering for the actions column
    }),
    [authorizeRole]
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text="Document Types" />
        <Text className="text-md text-blue-950">
          This is where you manage the document types.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Document Type"
        showExportButton={false}
        showImportButton={false}
      />

      <DynamicDataGrid
        rows={rows}
        setRows={setRows}
        columns={columns}
        url={"/document-types"}
      />

      {/* Modals */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Document Type"
        onSubmit={addDocumentType}
      >
        <DocumentTypeForm
          documentTypeName={formData.documentTypeName}
          handleInputChange={handleInputChange}
          errors={validationErrors}
        />
      </FormModal>

      <FormModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        modalTitle="Edit Document Type"
        onSubmit={updateDocumentType}
      >
        <DocumentTypeForm
          documentTypeName={formData.documentTypeName}
          handleInputChange={handleInputChange}
          errors={validationErrors}
        />
      </FormModal>

      <DeleteConfirmModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        title="Delete document Type"
        message="Are you sure you want to archive a document type?"
        handleDelete={deleteDocumentType}
      />
    </Page>
  );
};

export default ViewDocumentTypePage;
