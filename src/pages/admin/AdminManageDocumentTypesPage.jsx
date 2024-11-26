import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import AdminDocumentTypesTable from "../../components/users/admin/table/AdminDocumentTypesTable";
import FormModal from "../../components/modals/FormModal";
import AdminDocumentTypeForm from "./forms/AdminDocumentTypeForm";
import { postRequest, putRequest, deleteRequest } from "../../api/apiHelpers";
import DocumentTypeForm from "../../components/forms/DocumentTypeForm";
import Table from "../../components/tables/Table";
import Loader from "../../components/common/Loader";

const AdminManageDocumentTypesPage = () => {
  // Retrieve the document_types data from the loader
  const initial_document_types = useLoaderData();

  // console.log(initial_document_types);

  // Loader state
  const [loading, setLoading] = useState(false);

  // State for documentTypes and form modal
  const [documentTypes, setDocumentTypes] = useState(initial_document_types);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form input and errors
  const [documentTypeName, setDocumentTypeName] = useState("");
  const [errors, setErrors] = useState({});

  // Select State
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);

  // Delete a Document Type
  /* const deleteDocumentType = async (id) => {
    try {
      // console.log(id);

      // DELETE METHOD
      const response = await deleteRequest({
        url: `/api/v1/document-types/${id}`,
      });

      // Update the Document Type in the state
      setDocumentTypes((prevDocumentTypes) =>
        prevDocumentTypes.map((documentType) =>
          documentType.id === id
            ? { ...documentType, ...response.data }
            : documentType
        )
      );
    } catch (error) {
      console.log(`Cannot delete a document type: `, error);
    }
  }; */

  // Update a Document Type
  const updateDocumentType = async () => {
    // Set Loading
    setLoading(true);

    try {
      // Ready payload
      const payload = {
        name: documentTypeName,
      };

      // console.log(payload);
      // Send update request to the backend
      const response = await putRequest({
        url: `/api/v1/document-types/${selectedDocumentType["id"]}`,
        data: payload,
      });

      // Update the Document Type in the state
      setDocumentTypes((prevDocumentTypes) =>
        prevDocumentTypes.map((documentType) =>
          documentType.id === selectedDocumentType["id"]
            ? { ...documentType, ...response.data }
            : documentType
        )
      );

      // Reset inputs and modals
      setDocumentTypeName("");
      setEditIsOpen(false);
    } catch (error) {
      // Handle and set errors
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Select Document Type
  const handleEdit = (documentType) => {
    // Set Document Type State
    // console.log(documentType);
    setSelectedDocumentType(documentType);
    setDocumentTypeName(documentType["name"]);

    // Open Modal
    setEditIsOpen(true);
  };

  // Add a new program
  const addDocumentType = async () => {
    // Set loading to true when the request starts
    setLoading(true);

    try {
      // Ready for payload
      const payload = {
        name: documentTypeName,
      };

      // Make the POST request
      const response = await postRequest({
        url: "/api/v1/document-types",
        data: payload,
      });

      if (response) {
        setLoading(!loading);

        // Add the new document type to the local state
        setDocumentTypes((prevDocumentTypes) => [
          ...prevDocumentTypes,
          response.data,
        ]);
      }

      // Reset form and close modal on success
      setDocumentTypeName("");
      setErrors({});
      setIsOpen(false);
    } catch (error) {
      // Handle and set errors
      if (error.response && error.response.data && error.response.data.errors) {
        // console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        // console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      // Ensure loading is set to false regardless of success or error
      setLoading(false);
    }
  };

  return (
    <>
      <Page>
        {/* Loader component */}
        <Loader loading={loading} />
        <Section>
          <Heading level={3} text={"Document Types"} />
          <Text className="text-sm text-blue-950">
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

        {/* Table */}
        <Table
          data={documentTypes}
          handleEdit={handleEdit}
          // handleArchive={deleteDocumentType}
          includeCheckboxes={false}
        />

        {/* Modals */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add Document Type"
          onSubmit={addDocumentType}
        >
          <DocumentTypeForm
            documentTypeName={documentTypeName}
            setDocumentTypeName={setDocumentTypeName}
            errors={errors}
          />
        </FormModal>

        {selectedDocumentType && (
          <FormModal
            isOpen={editIsOpen}
            setIsOpen={setEditIsOpen}
            modalTitle="Edit Document Type"
            onSubmit={updateDocumentType}
          >
            <DocumentTypeForm
              documentTypeName={documentTypeName}
              setDocumentTypeName={setDocumentTypeName}
              errors={errors}
            />
          </FormModal>
        )}
      </Page>
    </>
  );
};

export default AdminManageDocumentTypesPage;
