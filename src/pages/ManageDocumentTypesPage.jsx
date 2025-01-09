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
import { Button, Tab, TabGroup, TabList } from "@headlessui/react";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import {
  getDocumentTypeActionColumns,
  getDocumentTypeStaticColumns,
} from "../utils/columns/documentTypeColumns";
import {
  GET_API_ROUTE_PATH,
  POST_API_ROUTE_PATH,
  PUT_API_ROUTE_PATH,
} from "../api/resources";

// Tabs Links
const tabLinks = [
  {
    name: "All",
    url: GET_API_ROUTE_PATH.document_types, // The backend resource for 'All' students
    authorizeRoles: ["admin", "osa"],
  },
  {
    name: "Archived",
    url: `${GET_API_ROUTE_PATH.document_types}?status=archived`, // The backend resource for 'All' students
    authorizeRoles: ["admin", "osa"],
  },
];

/**
 * Role Allowed: Admin, OSA
 */
const ManageDocumentTypePage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Row state
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState(tabLinks[0]);

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
  } = useRequest({
    setData: setRows,
    setIsOpen: setIsOpen,
    setLoading: setLoading,
  });

  /**
   * Function that restore a deleted document type
   */
  const restoreDocumentType = (id) => {
    // console.log(id);

    // UPDATE METHOD
    putData({
      url: `${PUT_API_ROUTE_PATH.document_types}/${id}/restore`,
      id: id,
    });
  };

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
      url: POST_API_ROUTE_PATH.document_types,
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

    // Set Select State
    setSelectedDocumentType(row);

    // Set Form Values
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
    // Set Select State
    setSelectedDocumentType(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(() => getDocumentTypeStaticColumns(), []);

  // Action Column
  const actionColumn = useMemo(
    () =>
      getDocumentTypeActionColumns({
        handleEditModal: handleEditModal,
        handleDeleteModal: handleDeleteModal,
        authorizeRole: authorizeRole,
        activeTab: activeTab,
        restoreDocumentType: restoreDocumentType,
      }),
    [activeTab]
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text="Manage Document Types" />
        <Text className="text-md text-blue-950">
          This is where you manage the document types.
        </Text>
        <hr className="my-3" />
      </Section>

      <div className="mt-3">
        <TabGroup>
          <TabList className="flex gap-4 mb-5">
            {tabLinks.map((tab, index) => {
              if (!tab.authorizeRoles.includes(authorizeRole)) {
                return null;
              }

              return (
                <Tab
                  key={index}
                  className={`rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none ${
                    activeTab.name === tab.name
                      ? "bg-blue-700 text-white" // Active tab style
                      : "bg-transparent text-blue-700" // Inactive tab style
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.name}
                </Tab>
              );
            })}
          </TabList>

          {activeTab.name === "All" && (
            <ManageHeader
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              addPlaceholder="Add New Document Type"
              showExportButton={false}
              showImportButton={false}
            />
          )}

          <DynamicDataGrid
            searchPlaceholder={"Search Roles"}
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={activeTab.url}
            requestedBy={authorizeRole}
            checkboxSelection={false}
          />
        </TabGroup>
      </div>

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

      {/* Delete Form Modal */}
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

export default ManageDocumentTypePage;
