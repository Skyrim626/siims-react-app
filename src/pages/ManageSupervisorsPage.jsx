import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import ManageHeader from "../components/common/ManageHeader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import FormModal from "../components/modals/FormModal";
import SupervisorForm from "../components/forms/SupervisorForm";
import useForm from "../hooks/useForm";
import { getRequest } from "../api/apiHelpers";
import useRequest from "../hooks/useRequest";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import { loginInfo } from "../formDefaults/loginInfo";
import { personalInfo } from "../formDefaults/personalInfo";
import { addressInfo } from "../formDefaults/addressInfo";
import { GET_API_ROUTE_PATH, PUT_API_ROUTE_PATH } from "../api/resources";
import StatusDropdown from "../components/dropdowns/StatusDropdown";
import {
  getSupervisorActionColumns,
  getSupervisorStaticColumns,
} from "../utils/columns/supervisorColumns";

const ManageSupervisorsPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // Lists State
  const [listOfOffices, setListOfOffices] = useState([]);

  /**
   *
   *
   * Row State
   *
   *
   *
   */
  const [rows, setRows] = useState([]);
  /**
   *
   *
   *
   * URL State
   *
   *
   */
  const [dataGridUrl, setDataGridUrl] = useState(
    GET_API_ROUTE_PATH.supervisors
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
  const [selectedSupervisor, setSelectedSupervisor] = useState({});

  useEffect(() => {
    setDataGridUrl(
      selectedStatus === "archived"
        ? `${GET_API_ROUTE_PATH.supervisors}?status=archived`
        : GET_API_ROUTE_PATH.supervisors
    );
  }, [selectedStatus]);

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    ...loginInfo,
    ...personalInfo,
    ...addressInfo,
    // Supervisor unique fields
    office_id: "",
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

  // Load list of offices
  useEffect(() => {
    const getListOfOffices = async () => {
      // Set Loading
      setLoading(true);
      try {
        const listOfOfficesResponse = await getRequest({
          url: "/api/v1/offices/lists",
        });

        if (listOfOfficesResponse) {
          // console.log(listOfOfficesResponse);
          setListOfOffices(listOfOfficesResponse);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // ! Call Method
    getListOfOffices();
  }, []);

  /**
   * Function that restore a deleted supervisor type
   */
  const restoreSupervisor = (id) => {
    // console.log(id);

    // UPDATE METHOD
    putData({
      url: `${PUT_API_ROUTE_PATH.supervisors}/${id}/restore`,
      id: id,
    });
  };

  // Function that adds new supervisor
  const addSupervisor = () => {
    // console.log(formData);

    // POST METHOD
    postData({
      url: "/users/supervisors",
      payload: formData,
      resetForm: resetForm,
    });
  };

  /**
   * Function that updates a supervisor
   */
  const updateSupervisor = () => {
    // PUT METHOD
    putData({
      url: `/users/supervisors/${selectedSupervisor["id"]}`,
      payload: formData,
      selectedData: selectedSupervisor,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedSupervisor(row);

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
   * Function that deletes a supervisor
   */
  const deleteSupervisor = () => {
    // DELETE METHOD
    deleteData({
      url: `/users/supervisors/${selectedSupervisor["id"]}`,
      id: selectedSupervisor["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedSupervisor(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(
    () => getSupervisorStaticColumns({ authorizeRole, selectedStatus }),
    [authorizeRole, selectedStatus]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getSupervisorActionColumns({
        authorizeRole,
        handleEditModal,
        handleDeleteModal,
        selectedStatus,
        restoreSupervisor,
      }),
    [authorizeRole, selectedStatus]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <Page className={`${authorizeRole !== "admin" ? "px-4" : ""}`}>
      <Loader loading={loading} />

      {/* For those roles that is not admin */}
      {authorizeRole !== "admin" && (
        <Section>
          <Heading level={3} text="Manage Supervisors" />
          <Text className="text-md text-blue-950">
            This is where you manage the supervisors.
          </Text>
          <hr className="my-3" />
        </Section>
      )}

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <StatusDropdown
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <ManageHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addPlaceholder="Add New Supervisor"
            showExportButton={false}
            showImportButton={false}
          />
        </div>

        <DynamicDataGrid
          searchPlaceholder={"Search Supervisor"}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={dataGridUrl}
          requestedBy={authorizeRole}
        />

        {/* Add Form Modal */}
        <FormModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalTitle="Add Supervisor"
          onSubmit={addSupervisor}
        >
          <SupervisorForm
            method="post"
            supervisorInfo={formData}
            handleSupervisorInfoChange={handleInputChange}
            offices={listOfOffices}
            errors={validationErrors}
          />
        </FormModal>

        {/* Edit Form Modal */}
        <FormModal
          isOpen={isEditOpen}
          setIsOpen={setEditIsOpen}
          modalTitle="Edit Supervisor"
          onSubmit={updateSupervisor}
        >
          <SupervisorForm
            method="put"
            supervisorInfo={formData}
            handleSupervisorInfoChange={handleInputChange}
            offices={listOfOffices}
            errors={validationErrors}
          />
        </FormModal>

        {/* Delete Form Modal */}
        <DeleteConfirmModal
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title="Delete supervisor"
          message="Are you sure you want to delete this supervisor?"
          handleDelete={deleteSupervisor}
        />
      </div>
    </Page>
  );
};

export default ManageSupervisorsPage;
