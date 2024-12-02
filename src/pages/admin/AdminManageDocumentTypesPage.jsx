import React, { useState, useEffect } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import ManageHeader from "../../components/common/ManageHeader";
import TestTable from "../../components/tables/TestTable";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/tables/TestPagination";
import useFetch from "../../hooks/useFetch";
import useSearch from "../../hooks/test/useSearch";
import DataTable from "../../components/tables/DataTable";

const AdminManageDocumentTypesPage = () => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [loading, setLoading] = useState(false);

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
    url: "document-types", // URL for document types
    initialPage: 1,
    initialItemsPerPage: 5,
    searchTerm: triggerSearch ? searchTerm : "", // Only pass search term when search is triggered
    setData: setDocumentTypes,
    setLoading: setLoading,
  });

  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text={"Document Types"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the document types.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={false}
        setIsOpen={false}
        addPlaceholder="Add New Document Type"
        showExportButton={false}
        showImportButton={false}
      />

      {error ? (
        <EmptyState title="Error" message={error} />
      ) : documentTypes && documentTypes.length > 0 ? (
        <>
          <DataTable
            data={documentTypes} // Pass the fetched data to the table
            handleEdit={() => {}}
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
    </Page>
  );
};

export default AdminManageDocumentTypesPage;
