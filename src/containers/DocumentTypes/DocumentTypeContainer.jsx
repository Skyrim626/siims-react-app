import React, { useEffect, useMemo, useState } from "react";
import DocumentTypePresenter from "./DocumentTypePresenter";
import { post } from "./api";
import Loader from "../../components/common/Loader";

import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import {
  getDocumentTypeActionColumns,
  getDocumentTypeStaticColumns,
} from "./utilities/columns";

import {
  PUT_DATA_BY_ID,
  RESTORE_DATA_BY_ID,
  GET_ARCHIVED_DATA,
  GET_DATA,
  DELETE_DATA_BY_ID,
} from "./constants/resources";

const DocumentTypeContainer = ({ authorizeRole }) => {
  /**
   *
   * Loading States
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   *
   * Data States
   *
   *
   *
   */
  const [rows, setRows] = useState([]);

  /**
   *
   *
   * Select States
   *
   *
   *
   */
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDocumentType, setSelectedDocumentType] = useState({});

  /**
   *
   * Modal States
   *
   */
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /**
   *
   *
   * Custom Hooks
   *
   *
   *
   */
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    name: "",
  });
  const [errors, setErrors] = useState({});

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
   *
   *
   *
   * URL State
   *
   *
   */
  const [getUrl, setGetUrl] = useState(GET_DATA);

  /**
   *
   *
   * Use Effects
   *
   *
   */

  useEffect(() => {
    setGetUrl(selectedStatus === "archived" ? GET_ARCHIVED_DATA : GET_DATA);
  }, [selectedStatus]);

  /**
   *
   *
   * Other Functions
   *
   *
   */

  // Restore
  const restoreDocumentType = (id) => {
    // Update Method
    putData({
      url: RESTORE_DATA_BY_ID(id),
      id: id,
    });
  };

  // PUT
  const updateDocumentType = () => {
    // Update Method
    putData({
      url: PUT_DATA_BY_ID(selectedDocumentType["id"]),
      payload: formData,
      selectedData: selectedDocumentType,
      setIsOpen: setIsEditOpen,
      resetForm: resetForm,
    });
  };

  // POST
  const addDocumentType = () => {
    post({
      payload: formData,
      setStates: {
        setLoading: setLoading,
        setRows: setRows,
        setIsOpen: setIsOpen,
        setErrors: setErrors,
      },
      authorizeRole: authorizeRole,
    });
  };

  // Delete
  const deleteDocumentType = () => {
    // DELETE METHOD
    deleteData({
      url: DELETE_DATA_BY_ID(selectedDocumentType["id"]),
      id: selectedDocumentType["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   *
   *
   * Handle Modal Pop Up
   *
   *
   */

  // Edit
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedDocumentType(row);
    setFormValues({
      ...row,
    });

    // Open Edit Modal
    setIsEditOpen(true);
  };

  // Delete
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedDocumentType(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  /**
   *
   *
   * COLUMN MODIFIER
   *
   *
   */

  // Static Columns
  const staticColumns = useMemo(() => getDocumentTypeStaticColumns(), []);

  // Action Columns
  const actionColumn = useMemo(
    () =>
      getDocumentTypeActionColumns({
        handleEditModal: handleEditModal,
        handleDeleteModal: handleDeleteModal,
        authorizeRole: authorizeRole,
        selectedStatus: selectedStatus,
        restoreDocumentType: restoreDocumentType,
      }),
    [selectedStatus]
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  // Check loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      <DocumentTypePresenter
        authorizeRole={authorizeRole}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        // Header Props
        isManageHeaderOpen={isOpen}
        setIsManageHeaderOpen={setIsOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        errors={errors}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addDocumentType={addDocumentType}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        updateDocumentType={updateDocumentType}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        deleteDocumentType={deleteDocumentType}
        // Data Grid Props
        searchPlaceholder={"Search Document Type"}
        rows={rows}
        setRows={setRows}
        columns={columns}
        dataGridUrl={getUrl}
      />
    </>
  );
};

export default DocumentTypeContainer;
