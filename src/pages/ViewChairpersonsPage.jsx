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

  // Select State
  const [selectedChairperson, setSelectedChairperson] = useState({});

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
    allowCoordinator: false,
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
        allow_coordinator: formData.allowCoordinator,
      },
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
      },
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
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedChairperson(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(() => {
    const columns = [
      {
        field: "id",
        headerName: "ID",
        width: 90,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "first_name",
        headerName: "First Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "middle_name",
        headerName: "Middle Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "last_name",
        headerName: "Last Name",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email_verified_at",
        headerName: "Email Verified At",
        width: 250,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "program",
        headerName: "Program Assigned",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "college",
        headerName: "College",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "phone_number",
        headerName: "Phone Number",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "street",
        headerName: "Street",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "barangay",
        headerName: "Barangay",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "city_municipality",
        headerName: "City/Municipality",
        width: 200,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "province",
        headerName: "Province",
        width: 150,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "postal_code",
        headerName: "Postal Code",
        width: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "updated_at",
        headerName: "Updated At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "deleted_at",
        headerName: "Deleted At",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
    ];

    return columns;
  }, []);

  // Action Column
  const actionColumn = useMemo(
    () => ({
      field: "actions",
      headerName: "Actions",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="flex space-x-2 items-center justify-center">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            onClick={() => handleEditModal(params.row)}
          >
            Edit
          </Button>

          <Button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
            onClick={() => handleDeleteModal(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
      sortable: false, // Prevent sorting for the actions column
      filterable: false, // Prevent filtering for the actions column
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

    fetchListOfPrograms(); // Call Function
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <div className="mt-3">
        <ManageHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          addPlaceholder="Add New Chairperson"
          showExportButton={false}
          showImportButton={false}
        />

        <DynamicDataGrid
          searchPlaceholder={"Search Chairperson"}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={"/users/chairpersons"}
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
