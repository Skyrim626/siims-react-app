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
import useSearch from "../../hooks/test/useSearch";
import useFetch from "../../hooks/useFetch";
import DataTable from "../../components/tables/DataTable";
import useRequest from "../../hooks/useRequest";
import Loader from "../../components/common/Loader";

const OsaManageDocumentTypesPage = () => {
  // Container Data
  const [documentTypes, setDocumentTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Input State
  const [documentTypeName, setDocumentTypeName] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);

  /**
   *
   *
   *
   * Custom Hooks
   *
   *
   *
   */
  // Search Hooks
  const { searchTerm, triggerSearch, handleSearchChange, handleKeyDown } =
    useSearch();

  // Fetch document types with search and pagination
  const {
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    handleNextPage,
    handlePrevPage,
  } = useFetch({
    url: "/document-types", // URL for document types
    initialPage: 1,
    initialItemsPerPage: 5,
    searchTerm: triggerSearch ? searchTerm : "", // Only pass search term when search is triggered
    setData: setDocumentTypes,
    setLoading: setLoading,
  });

  /**
   * Use Request
   */
  const { errors, postData, putData } = useRequest({
    setData: setDocumentTypes,
    setLoading,
    setIsOpen: setIsOpen,
  });

  // Update a document type
  const updateDocumentType = async () => {
    // Ready Payload
    const payload = {
      name: documentTypeName,
    };

    // Update Data
    putData({
      url: `/document-types/${selectedDocumentType["id"]}`,
      payload: payload,
      selectedData: selectedDocumentType,
      setIsOpen: setEditIsOpen,
    });
  };

  // Handle Edit Select Document Type
  const grabDocumentType = (documentType) => {
    setSelectedDocumentType(documentType);
    setDocumentTypeName(documentType.name);
    // Open Modal
    setEditIsOpen(true);
  };

  // Add new Document Type
  const addDocumentType = () => {
    // Ready Payload
    const payload = {
      name: documentTypeName,
    };
    // Add Data
    postData({
      url: "/document-types",
      payload: payload,
    });
  };

  return (
    <Page>
      {/* Loading Component */}
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
      {error ? (
        <EmptyState title="Error" message={errors} />
      ) : documentTypes && documentTypes.length > 0 ? (
        <>
          <DataTable
            data={documentTypes} // Pass the fetched data to the table
            handleEdit={grabDocumentType}
            includeCheckboxes={false}
            /** Pagination */
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            ITEMS_PER_PAGE_LISTS={[{ value: 5 }, { value: 25 }, { value: 50 }]}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            handleItemsPerPageChange={handleItemsPerPageChange}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            /** Search */
            searchPlaceholder={"Search Document Type"}
            searchTerm={searchTerm}
            handleKeyDown={handleKeyDown}
            handleSearchChange={handleSearchChange}
          />
        </>
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
