import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Page from "../components/common/Page";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import ManageHeader from "../components/common/ManageHeader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { Button } from "@headlessui/react";
import FormModal from "../components/modals/FormModal";
import ProgramForm from "../components/forms/ProgramForm";
import useForm from "../hooks/useForm";
import useRequest from "../hooks/useRequest";
import Loader from "../components/common/Loader";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import { getRequest } from "../api/apiHelpers";

const ViewProgramsPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State for Lists
  const [listOfChairpersons, setListOfChairpersons] = useState([]);
  const [listOfColleges, setListOfColleges] = useState([]);

  // Row state
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Select State
  const [selectedProgram, setSelectedProgram] = useState({});

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    collegeId: "",
    chairpersonId: "",
    programName: "",
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
   * Function that adds new program
   */
  const addProgram = () => {
    // POST METHOD
    postData({
      url: "/programs",
      payload: {
        name: formData.programName,
        college_id: formData.collegeId,
      },
      resetForm: resetForm,
    });
  };

  /**
   * Function that updates a program
   */
  const updateProgram = () => {
    // PUT METHOD
    putData({
      url: `/programs/${selectedProgram["id"]}`,
      payload: {
        name: formData.programName,
        chairperson_id: formData.chairpersonId,
      },
      selectedData: selectedProgram,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedProgram(row);

    // Set Form Values
    setFormValues({
      collegeId: row.college_id,
      programName: row.name,
      chairpersonId: row.chairperson_id,
    });

    // Open Edit Modal
    setEditIsOpen(true);
  };

  /**
   * Function that deletes a program
   */
  const deleteProgram = () => {
    // DELETE METHOD
    deleteData({
      url: `/programs/${selectedProgram["id"]}`,
      id: selectedProgram["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedProgram(row);

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

    // Fetch Needed Data for Lists in Select
    const fetchListsOfChairpersons = async () => {
      // Set Loading
      setLoading(true);

      try {
        const listOfChairpersonsResponse = await getRequest({
          url: "/api/v1/users/chairpersons/including-programs",
        });

        // Set State
        setListOfChairpersons(listOfChairpersonsResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Check if role is authorized
    if (authorizeRole === "admin") {
      fetchListOfCollege(); // Call Function
    }

    // Call Method
    fetchListsOfChairpersons();
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
        field: "chairperson_id",
        headerName: "Chairperson ID",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "name",
        headerName: "Program Name",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "total_students",
        headerName: "Total Students",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "chairperson_assigned",
        headerName: "Assigned Chairperson",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "email",
        headerName: "Chairperson Email",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "phone_number",
        headerName: "Phone Number",
        width: 300,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "college",
        headerName: "College Name",
        width: 300,
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
    ];

    // Add the "Deleted At" column only if the role is "admin"
    if (authorizeRole === "admin") {
      columns.push({
        field: "deleted_at",
        headerName: "Deleted At",
        width: 300,
        headerClassName: "super-app-theme--header",
      });
    }

    return columns;
  }, [authorizeRole]);

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
    [authorizeRole]
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <Page>
      <Loader loading={loading} />
      <Section>
        <Heading level={3} text="Manage Programs" />
        <Text className="text-md text-blue-950">
          This is where you manage the programs.
        </Text>
        <hr className="my-3" />
      </Section>

      <ManageHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addPlaceholder="Add New Program"
        showExportButton={false}
        showImportButton={false}
      />

      <DynamicDataGrid
        searchPlaceholder={"Search Programs"}
        rows={rows}
        setRows={setRows}
        columns={columns}
        url={"/programs"}
      />

      {/* Modals */}
      {/* Add Form Modal */}
      <FormModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle="Add Program"
        onSubmit={addProgram}
      >
        <ProgramForm
          authorizeRole={authorizeRole} // Admin or Dean
          method="post"
          collegeId={formData.collegeId}
          programName={formData.programName}
          handleInputChange={handleInputChange}
          errors={validationErrors}
          colleges={listOfColleges}
        />
      </FormModal>

      {/* Edit Form Modal */}
      <FormModal
        isOpen={isEditOpen}
        setIsOpen={setEditIsOpen}
        modalTitle="Edit Program"
        onSubmit={updateProgram}
      >
        <ProgramForm
          authorizeRole={authorizeRole} // Admin or Dean
          method="put"
          collegeId={formData.collegeId}
          programName={formData.programName}
          chairpersonId={formData.chairpersonId}
          handleInputChange={handleInputChange}
          errors={validationErrors}
          colleges={listOfColleges}
          chairpersons={listOfChairpersons}
        />
      </FormModal>

      {/* Delete Form Modal */}
      <DeleteConfirmModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        title="Delete Program"
        message="Are you sure you want to delete this Program?"
        handleDelete={deleteProgram}
      />
    </Page>
  );
};

export default ViewProgramsPage;
