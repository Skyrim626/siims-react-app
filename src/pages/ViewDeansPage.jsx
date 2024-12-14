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

  // Select State
  const [selectedDean, setSelectedDean] = useState({});

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
    collegeId: "",
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
        college_id: formData.collegeId,
      },
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
        college_id: formData.collegeId,
      },
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
      collegeId: row.college_id,
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
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedDean(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

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
        field: "college_name",
        headerName: "College Assigned",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email_verified_at",
        headerName: "Email Verified At",
        width: 250,
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

  return (
    <>
      <Loader loading={loading} />
      <div className="mt-3">
        <ManageHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          addPlaceholder="Add New Dean"
          showExportButton={false}
          showImportButton={false}
        />

        <DynamicDataGrid
          searchPlaceholder={"Search Dean"}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={"/users/deans"}
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
