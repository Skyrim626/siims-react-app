import React from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import SelectDropDown from "./components/SelectDropDown";
import ManageHeader from "../../components/common/ManageHeader";
import DynamicDataGrid from "../../components/tables/DynamicDataGrid";
import FormModal from "../../components/modals/FormModal";
import DeleteConfirmModal from "./components/modals/DeleteConfirmModal";

import DocumentTypeForm from "./forms/DocumentTypeForm";

const DocumentTypePresenter = ({
  // Authorization
  authorizeRole,

  selectedStatus,
  setSelectedStatus,

  isManageHeaderOpen,
  setIsManageHeaderOpen,

  // Form Props
  formData,
  handleInputChange,
  errors,

  /**
   * Modal Props
   */

  // Add Modal
  isOpen,
  setIsOpen,
  addDocumentType,

  // Edit Modal
  isEditOpen,
  setIsEditOpen,
  updateDocumentType,

  // Delete Modal
  isDeleteOpen,
  setIsDeleteOpen,
  deleteDocumentType,

  // Data Grid Props
  searchPlaceholder = "Search Document",
  rows = [],
  setRows,
  columns,
  dataGridUrl,
}) => {
  return (
    <Page>
      <Section>
        <Heading level={3} text="Manage Document Types" />
        <Text className="text-md text-blue-950">
          This is where you manage the document types.
        </Text>
        <hr className="my-3" />
      </Section>

      <div className="mt-3">
        <SelectDropDown
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <ManageHeader
          isOpen={isManageHeaderOpen}
          setIsOpen={setIsManageHeaderOpen}
          addPlaceholder="Add New Document Type"
          showExportButton={false}
          showImportButton={false}
        />

        <DynamicDataGrid
          searchPlaceholder={searchPlaceholder}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={dataGridUrl}
          requestedBy={authorizeRole}
          checkboxSelection={false}
        />
      </div>

      {/* Modals */}

      {/* Add Form Modal */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Document Type"
        onSubmit={addDocumentType}
      >
        <DocumentTypeForm
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      </FormModal>

      {/* Edit Form Modal */}
      <FormModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        modalTitle="Edit Document Type"
        onSubmit={updateDocumentType}
      >
        <DocumentTypeForm
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      </FormModal>

      {/* Delete Form Modal */}
      <DeleteConfirmModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        handleDelete={deleteDocumentType}
      />
    </Page>
  );
};

export default DocumentTypePresenter;
