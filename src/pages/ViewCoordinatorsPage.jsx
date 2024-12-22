import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/common/Loader";
import ManageHeader from "../components/common/ManageHeader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Button } from "@headlessui/react";
import useForm from "../hooks/useForm";
import FormModal from "../components/modals/FormModal";
import CoordinatorForm from "../components/forms/CoordinatorForm";
import { getRequest, postFormDataRequest } from "../api/apiHelpers";
import useRequest from "../hooks/useRequest";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import ImportCoordinatorForm from "../components/forms/ImportCoordinatorForm";
import Page from "../components/common/Page";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import {
  getCoordinatorActionColumns,
  getCoordinatorStaticColumns,
} from "../utils/columns";
import { useLocation } from "react-router-dom";

const ViewCoordinatorsPage = ({ authorizeRole }) => {
  // Open location
  const location = useLocation();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State for Lists
  const [listOfPrograms, setListOfPrograms] = useState([]);

  /**
   * File State
   */
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(""); // 'success' or 'error

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenImport, setIsOpenImport] = useState(false);

  // Select State
  const [selectedCoordinator, setSelectedCoordinator] = useState({});
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    id: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    street: "",
    barangay: "",
    cityMunicipality: "",
    province: "",
    postalCode: "",
    programId: "",
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
   * Function that adds a new coordinator
   */
  const addCoordinator = () => {
    // console.log(formData);

    // POST METHOD
    postData({
      url: "/users/coordinators",
      payload: {
        id: formData.id,
        password: formData.password,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        phone_number: formData.phoneNumber,
        street: formData.street,
        barangay: formData.barangay,
        city_municipality: formData.cityMunicipality,
        province: formData.province,
        postal_code: formData.postalCode,
        program_id: formData.programId,
      },
      resetForm: resetForm,
    });
  };

  /**
   * Function that updates a coordinator
   */
  const updateCoordinator = () => {
    // PUT METHOD
    putData({
      url: `/users/coordinators/${selectedCoordinator["id"]}`,
      payload: {
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        phone_number: formData.phoneNumber,
        street: formData.street,
        barangay: formData.barangay,
        city_municipality: formData.cityMunicipality,
        province: formData.province,
        postal_code: formData.postalCode,
        program_id: formData.programId,
      },
      selectedData: selectedCoordinator,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedCoordinator(row);

    // console.log(row);

    // Set Form Values
    setFormValues({
      firstName: row.first_name,
      middleName: row.middle_name,
      lastName: row.last_name,
      email: row.email,
      gender: row.gender.toLowerCase(),
      phoneNumber: row.phone_number,
      street: row.street,
      barangay: row.barangay,
      cityMunicipality: row.city_municipality,
      province: row.province,
      postalCode: row.postal_code,
      programId: row.program_id,
    });

    // Open Edit Modal
    setEditIsOpen(true);
  };

  /**
   * Function that deletes a coordinator
   */
  const deleteCoordinator = () => {
    // DELETE METHOD
    deleteData({
      url: `/users/coordinators/${selectedCoordinator["id"]}`,
      id: selectedCoordinator["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedCoordinator(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getCoordinatorStaticColumns({
        pathname: location.pathname,
      }),
    []
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getCoordinatorActionColumns({
        authorizeRole: authorizeRole,
        handleEditModal: handleEditModal,
        handleDeleteModal: handleDeleteModal,
      }),
    []
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

    // ! Fetch the program ID of a Chairperson Only
    const fetchCurrentProgramId = async () => {
      // Set Loading
      setLoading(true);

      try {
        const currentProgramResponse = await getRequest({
          url: "/api/v1/users/chairpersons/current-program-id",
        });

        if (currentProgramResponse) {
          setSelectedProgramId(currentProgramResponse);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // ! Call Function for Admin and Dean Only
    if (authorizeRole === "admin" || authorizeRole === "dean") {
      fetchListOfPrograms();
    }
    // ! Default: For Chairperson
    else {
      fetchCurrentProgramId();
    }
  }, []);

  /**
   * A function that handles the File Change
   */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setStatus(""); // Reset status on file selection
  };

  // Submit File
  const submitFile = async (event) => {
    event.preventDefault();
    if (!file) {
      setStatus("error");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Set Loading
      setLoading(true);

      // Assuming your backend has an endpoint for file upload
      const response = await postFormDataRequest({
        url: `/api/v1/users/coordinators/${selectedProgramId}/upload-coordinators`,
        data: formData,
      });

      setIsOpenImport(false);
      setStatus("success");

      if (response) {
        window.location.reload(); // Reload window
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // ! Only Display this if the User is Admin
  if (authorizeRole === "admin") {
    return (
      <>
        <Loader loading={loading} />

        <div className="mt-3">
          <ManageHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addPlaceholder="Add New Coordinator"
            showExportButton={false}
            showImportButton={true}
            isImportOpen={isOpenImport}
            setIsImportOpen={setIsOpenImport}
          />

          <DynamicDataGrid
            searchPlaceholder={"Search Coordinator"}
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={"/users/coordinators"}
          />

          {/* Modals */}
          {/* Add Form Modal */}
          <FormModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle="Add Coordinator"
            onSubmit={addCoordinator}
          >
            <CoordinatorForm
              coordinatorInfo={formData}
              handleCoordinatorInfoChange={handleInputChange}
              programs={listOfPrograms}
              errors={validationErrors}
            />
          </FormModal>

          {/* Edit Form Modal */}
          <FormModal
            isOpen={isEditOpen}
            setIsOpen={setEditIsOpen}
            modalTitle="Edit Coordinator"
            onSubmit={updateCoordinator}
          >
            <CoordinatorForm
              method="put"
              coordinatorInfo={formData}
              handleCoordinatorInfoChange={handleInputChange}
              programs={listOfPrograms}
              errors={validationErrors}
            />
          </FormModal>

          {/* Delete Form Modal */}
          <DeleteConfirmModal
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            title="Delete coordinator"
            message="Are you sure you want to delete this coordinator?"
            handleDelete={deleteCoordinator}
          />

          {/* Import Form Modal */}
          <FormModal
            isOpen={isOpenImport}
            setIsOpen={setIsOpenImport}
            modalTitle="Import Coordinators"
            onSubmit={submitFile}
          >
            <ImportCoordinatorForm
              file={file}
              set={setFile}
              status={status}
              setStatus={setStatus}
              handleFileChange={handleFileChange}
              programs={listOfPrograms}
              programId={selectedProgramId}
              setProgramId={setSelectedProgramId}
              withSelection={true}
            />
          </FormModal>
        </div>
      </>
    );
  }

  // ! Other User Role can view this
  else {
    return (
      <Page>
        <Loader loading={loading} />

        <Section>
          <Heading level={3} text="Manage Coordinators" />
          <Text className="text-md text-blue-950">
            This is where you manage the coordinators.
          </Text>
          <hr className="my-3" />
        </Section>

        <div className="mt-3">
          <ManageHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addPlaceholder="Add New Coordinator"
            showExportButton={false}
            showImportButton={true}
            isImportOpen={isOpenImport}
            setIsImportOpen={setIsOpenImport}
          />

          <DynamicDataGrid
            searchPlaceholder={"Search Coordinator"}
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={"/users/coordinators"}
          />

          {/* Modals */}
          {/* Add Form Modal */}
          <FormModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalTitle="Add Coordinator"
            onSubmit={addCoordinator}
          >
            <CoordinatorForm
              coordinatorInfo={formData}
              handleCoordinatorInfoChange={handleInputChange}
              programs={listOfPrograms}
              errors={validationErrors}
            />
          </FormModal>

          {/* Edit Form Modal */}
          <FormModal
            isOpen={isEditOpen}
            setIsOpen={setEditIsOpen}
            modalTitle="Edit Coordinator"
            onSubmit={updateCoordinator}
          >
            <CoordinatorForm
              method="put"
              coordinatorInfo={formData}
              handleCoordinatorInfoChange={handleInputChange}
              programs={listOfPrograms}
              errors={validationErrors}
            />
          </FormModal>

          {/* Delete Form Modal */}
          <DeleteConfirmModal
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            title="Delete coordinator"
            message="Are you sure you want to delete this coordinator?"
            handleDelete={deleteCoordinator}
          />

          {/* Import Form Modal */}
          <FormModal
            isOpen={isOpenImport}
            setIsOpen={setIsOpenImport}
            modalTitle="Import Coordinators"
            onSubmit={submitFile}
          >
            <ImportCoordinatorForm
              file={file}
              set={setFile}
              status={status}
              setStatus={setStatus}
              handleFileChange={handleFileChange}
              programs={
                // ! For Dean Only
                authorizeRole === "dean" && listOfPrograms
              }
              programId={selectedProgramId}
              setProgramId={setSelectedProgramId}
              // Display Selection if role is dean
              withSelection={authorizeRole === "dean"}
            />
          </FormModal>
        </div>
      </Page>
    );
  }
};

export default ViewCoordinatorsPage;
