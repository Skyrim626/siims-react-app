import React, { useEffect, useMemo, useState } from "react";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Button } from "@headlessui/react";
import ManageHeader from "../components/common/ManageHeader";
import Loader from "../components/common/Loader";
import FormModal from "../components/modals/FormModal";
import useForm from "../hooks/useForm";
import ChairpersonForm from "../components/forms/ChairpersonForm";
import useRequest from "../hooks/useRequest";
import { getRequest } from "../api/apiHelpers";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import {
  getChairpersonActionColumns,
  getChairpersonStaticColumns,
} from "../utils/columns";
import { loginInfo } from "../formDefaults/loginInfo";
import { personalInfo } from "../formDefaults/personalInfo";
import { addressInfo } from "../formDefaults/addressInfo";
import { GET_API_ROUTE_PATH, PUT_API_ROUTE_PATH } from "../api/resources";
import StatusDropdown from "../components/dropdowns/StatusDropdown";

const ViewChairpersonsPage = () => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State for Lists
  const [listOfPrograms, setListOfPrograms] = useState([]);

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
  const [dataGridUrl, setDataGridUrl] = useState(
    GET_API_ROUTE_PATH.chairpersons
  );

  /**
   *
   *
   * Select State
   *
   *
   *
   */
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedChairperson, setSelectedChairperson] = useState({});

  useEffect(() => {
    setDataGridUrl(
      selectedStatus === "archived"
        ? `${GET_API_ROUTE_PATH.chairpersons}?status=archived`
        : GET_API_ROUTE_PATH.chairpersons
    );
  }, [selectedStatus]);

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    ...loginInfo,
    ...personalInfo,
    ...addressInfo,
    program_id: "",
    allow_coordinator: false,
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
   * Function that adds a new chairperson
   */
  const addChairperson = () => {
    // console.log(formData);

    // POST METHOD
    postData({
      url: "/users/chairpersons",
      payload: formData,
      resetForm: resetForm,
    });
  };

  /**
   * Function that updates a chairperson
   */
  const updateChairperson = () => {
    // PUT METHOD
    putData({
      url: `/users/chairpersons/${selectedChairperson["id"]}`,
      payload: formData,
      selectedData: selectedChairperson,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedChairperson(row);

    // console.log(row);

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
  const deleteChairperson = () => {
    // DELETE METHOD
    deleteData({
      url: `/users/chairpersons/${selectedChairperson["id"]}`,
      id: selectedChairperson["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that restore a deleted chairperson type
   */
  const restoreChairperson = (id) => {
    // console.log(id);

    // UPDATE METHOD
    putData({
      url: `${PUT_API_ROUTE_PATH.chairpersons}/${id}/restore`,
      id: id,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedChairperson(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getChairpersonStaticColumns({
        pathname: location.pathname,
        selectedStatus: selectedStatus,
      }),
    [selectedStatus]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getChairpersonActionColumns({
        handleEditModal,
        handleDeleteModal,
        selectedStatus,
        handleRestore: restoreChairperson,
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
    const fetchListOfPrograms = async () => {
      // Set Loading
      setLoading(true);

      try {
        const listOfProgramsResponse = await getRequest({
          url: "/api/v1/programs/lists",
        });

        // Set State
        setListOfPrograms(listOfProgramsResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListOfPrograms(); // Call Function
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
            addPlaceholder="Add New Chairperson"
            showExportButton={false}
            showImportButton={false}
          />
        </div>

        <DynamicDataGrid
          searchPlaceholder={"Search Chairperson"}
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
          modalTitle="Add Chairperson"
          onSubmit={addChairperson}
        >
          <ChairpersonForm
            method="post"
            chairpersonInfo={formData}
            handleChairpersonInfoChange={handleInputChange}
            requiredFields={{
              id: true,
              password: true,
              first_name: true,
              middle_name: false,
              last_name: false,
              phone_number: false,
              email: true,
              gender: false,
              phoneNumber: false,
              street: false,
              barangay: false,
              cityMunicipality: false,
              province: false,
              postalCode: false,
              allow_coordinator: false,
              program_id: false,
            }}
            programs={listOfPrograms}
            errors={validationErrors}
          />
        </FormModal>

        {/* Edit Form Modal */}
        <FormModal
          isOpen={isEditOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Chairperson"
          onSubmit={updateChairperson}
        >
          <ChairpersonForm
            method="put"
            chairpersonInfo={formData}
            handleChairpersonInfoChange={handleInputChange}
            requiredFields={{
              id: false,
              password: false,
              first_name: true,
              middle_name: false,
              last_name: false,
              phone_number: false,
              email: true,
              gender: false,
              phoneNumber: false,
              street: false,
              barangay: false,
              cityMunicipality: false,
              province: false,
              postalCode: false,
              allow_coordinator: false,
              program_id: false,
            }}
            programs={listOfPrograms}
            errors={validationErrors}
          />
        </FormModal>

        {/* Delete Form Modal */}
        <DeleteConfirmModal
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title="Delete chairperson"
          message="Are you sure you want to delete this chairperson?"
          handleDelete={deleteChairperson}
        />
      </div>
    </>
  );
};

export default ViewChairpersonsPage;
