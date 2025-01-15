import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/common/Loader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Button } from "@headlessui/react";
import ManageHeader from "../components/common/ManageHeader";
import FormModal from "../components/modals/FormModal";
import DeanForm from "../components/forms/DeanForm";
import useForm from "../hooks/useForm";
import { getRequest } from "../api/apiHelpers";
import useRequest from "../hooks/useRequest";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

// Testing
import { loginInfo } from "../formDefaults/loginInfo";
import { addressInfo } from "../formDefaults/addressInfo";
import { personalInfo } from "../formDefaults/personalInfo";
import { GET_API_ROUTE_PATH, PUT_API_ROUTE_PATH } from "../api/resources";
import StatusDropdown from "../components/dropdowns/StatusDropdown";
import {
  getDeanActionColumns,
  getDeanStaticColumns,
} from "../utils/columns/deanColumns";

/**
 * Roles Allowed: Admin
 */
const ViewDeansPage = () => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State for Lists
  const [listOfColleges, setListOfColleges] = useState([]);

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /**
   *
   *
   *
   * URL State
   *
   *
   */
  const [dataGridUrl, setDataGridUrl] = useState(GET_API_ROUTE_PATH.deans);

  /**
   *
   *
   * Select State
   *
   *
   *
   */
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDean, setSelectedDean] = useState({});

  useEffect(() => {
    setDataGridUrl(
      selectedStatus === "archived"
        ? `${GET_API_ROUTE_PATH.deans}?status=archived`
        : GET_API_ROUTE_PATH.deans
    );
  }, [selectedStatus]);

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    ...loginInfo,
    ...personalInfo,
    ...addressInfo,
    college_id: "",
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
   * Function that adds new dean
   */
  const addDean = () => {
    // POST METHOD
    postData({
      url: "/users/deans",
      payload: formData,
      resetForm: resetForm,
    });
  };

  /**
   * Function that updates a dean
   */
  const updateDean = () => {
    // PUT METHOD
    putData({
      url: `/users/deans/${selectedDean["id"]}`,
      payload: formData,
      selectedData: selectedDean,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedDean(row);

    // Set Form Values
    setFormValues({
      ...row,
      gender: row.gender.toLowerCase(),
    });

    // Open Edit Modal
    setEditIsOpen(true);
  };

  /**
   * Function that deletes a dean
   */
  const deleteDean = () => {
    // DELETE METHOD
    deleteData({
      url: `/users/deans/${selectedDean["id"]}`,
      id: selectedDean["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that restore a deleted company type
   */
  const restoreCompany = (id) => {
    // console.log(id);

    // UPDATE METHOD
    putData({
      url: `${PUT_API_ROUTE_PATH.deans}/${id}/restore`,
      id: id,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedDean(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getDeanStaticColumns({
        pathname: location.pathname,
        selectedStatus: selectedStatus,
      }),
    [selectedStatus]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getDeanActionColumns({
        handleEditModal: handleEditModal,
        handleDeleteModal: handleDeleteModal,
        handleRestore: restoreCompany,
        selectedStatus: selectedStatus,
      }),
    [selectedStatus]
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  /**
   *
   * Use Effect Area
   *
   */
  // Loads the lists using UseEffect
  useEffect(() => {
    // Fetch Needed Data for Lists in Select
    const fetchListOfCollege = async () => {
      // Set Loading
      setLoading(true);

      try {
        const listOfCollegesResponse = await getRequest({
          url: "/api/v1/colleges/lists",
        });

        // Set State
        setListOfColleges(listOfCollegesResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListOfCollege(); // Call Function
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <StatusDropdown
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />

          <ManageHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addPlaceholder="Add New Dean"
            showExportButton={false}
            showImportButton={false}
          />
        </div>

        <DynamicDataGrid
          searchPlaceholder={"Search Dean"}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={dataGridUrl}
        />

        {/* Modals */}
        {/* Add Form Modal */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add Dean"
          onSubmit={addDean}
        >
          <DeanForm
            method="post"
            colleges={listOfColleges}
            deanInfo={formData}
            handleDeanInfoChange={handleInputChange}
            requiredFields={{
              id: true,
              password: true,
              first_name: true,
              middle_name: false,
              last_name: false,
              email: true,
              gender: false,
              phone_number: false,
              street: false,
              barangay: false,
              city_municipality: false,
              province: false,
              postal_code: false,
              college_id: true,
            }}
            errors={validationErrors}
          />
        </FormModal>

        {/* Edit Form Modal */}
        <FormModal
          isOpen={isEditOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Dean"
          onSubmit={updateDean}
        >
          <DeanForm
            method="put"
            colleges={listOfColleges}
            deanInfo={formData}
            handleDeanInfoChange={handleInputChange}
            requiredFields={{
              first_name: true,
              middle_name: false,
              last_name: false,
              email: true,
              gender: false,
              phone_number: false,
              street: false,
              barangay: false,
              city_municipality: false,
              province: false,
              postal_code: false,
              college_id: true,
            }}
            errors={validationErrors}
          />
        </FormModal>

        {/* Delete Form Modal */}
        <DeleteConfirmModal
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title="Delete Dean"
          message="Are you sure you want to delete this Dean?"
          handleDelete={deleteDean}
        />
      </div>
    </>
  );
};

export default ViewDeansPage;
