import React, { useState, useEffect } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import useFetch from "../../hooks/useFetch";
import useSearch from "../../hooks/test/useSearch";
import DataTable from "../../components/tables/DataTable";
import FormModal from "../../components/modals/FormModal";
import DocumentTypeForm from "../../components/forms/DocumentTypeForm";
import useRequest from "../../hooks/useRequest";

const AdminManageDocumentTypesPage = () => {
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
  const { errors, postData, putData, deleteData } = useRequest({
    setData: setDocumentTypes,
    setLoading,
    setIsOpen: setIsOpen,
  });

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

  // Update Document Type
  const updateDocumentType = () => {
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

  // Grab Data
  const grabDocumentType = (data) => {
    // console.log(data);
    setSelectedDocumentType(data);
    setDocumentTypeName(data.name);
    setEditIsOpen(true);
  };

  // Delete Document Type
  const deleteDocumentType = (id) => {
    // console.log(id);

    deleteData({
      url: `/document-types/${id}`,
      id: id,
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
            handleArchive={deleteDocumentType}
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

      {/* Form Modal */}
      {/* Add Form Modal */}
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

      {/* Edit Form Modal */}
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
    </Page>
  );
};

export default AdminManageDocumentTypesPage;
