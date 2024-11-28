import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { deleteRequest, postRequest, putRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import OsaDocumentTypesTable from "../../components/users/osa/table/OsaDocumentTypesTable";
import FormModal from "../../components/modals/FormModal";
import OsaDocumentTypeForm from "./forms/OsaDocumentTypeForm";
import EmptyState from "../../components/common/EmptyState";

const OsaManageDocumentTypesPage = () => {
  // Retrieve the document_types data from the loader
  const { initial_document_types } = useLoaderData();

  // console.log(initial_document_types);

  // State for documentTypes and form modal
  const [documentTypes, setDocumentTypes] = useState(initial_document_types);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Form input and errors
  const [documentTypeName, setDocumentTypeName] = useState("");
  const [errors, setErrors] = useState({});

  // Select State
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);

  // Update a document type
  const updateDocumentType = async () => {
    try {
      // Ready payload
      const payload = {
        name: documentTypeName,
      };

      // console.log(payload);
      // Send update request to the backend
      const response = await putRequest({
        url: `/api/v1/osa/document-types/${selectedDocumentType["id"]}`,
        data: payload,
      });

      // Update the document type in the state
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
    try {
      // Ready for payload
      const payload = {
        name: documentTypeName,
      };

      // Make the POST request
      const response = await postRequest({
        url: "/api/v1/osa/document-types",
        data: payload,
      });

      // Add the new document type to the local state
      setDocumentTypes((prevDocumentTypes) => [
        ...prevDocumentTypes,
        response.data,
      ]);
      // Reset form and close modal on success
      setDocumentTypeName("");
      setErrors({});
      setIsOpen(false);
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
    }
  };

  return (
    <Page>
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
      {documentTypes.length > 0 ? (
        <OsaDocumentTypesTable data={documentTypes} handleEdit={handleEdit} />
      ) : (
        <EmptyState
          title="No document types available at the moment"
          message="Once activities are recorded, document types will appear here."
        />
      )}

      {/* Modals */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Document Type"
        onSubmit={addDocumentType}
      >
        <OsaDocumentTypeForm
          documentTypeName={documentTypeName}
          setDocumentTypeName={setDocumentTypeName}
          errors={errors}
        />
      </FormModal>

      {selectedDocumentType && (
        <FormModal
          isOpen={editIsOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit College"
          onSubmit={updateDocumentType}
        >
          <OsaDocumentTypeForm
            documentTypeName={documentTypeName}
            setDocumentTypeName={setDocumentTypeName}
            errors={errors}
          />
        </FormModal>
      )}
    </Page>
  );
};

export default OsaManageDocumentTypesPage;
