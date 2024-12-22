import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/common/Loader";
import Page from "../components/common/Page";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import useRequest from "../hooks/useRequest";
import ManageHeader from "../components/common/ManageHeader";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import useForm from "../hooks/useForm";
import { Button, Tab, TabGroup, TabList } from "@headlessui/react";
import {
  getStudentActionColumns,
  getStudentStaticColumns,
} from "../utils/columns";
import StudentForm from "../components/forms/StudentForm";
import FormModal from "../components/modals/FormModal";
import { getRequest, postFormDataRequest, putRequest } from "../api/apiHelpers";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import ImportStudentForm from "./admin/forms/ImportStudentForm";
import { UserCheck } from "lucide-react";
import AssignConfirmModal from "../components/modals/AssignConfirmModal";
import AssignStudentForm from "../components/forms/AssignStudentForm";

// Tabs Links
const tabLinks = [
  {
    name: "All",
    url: "/users/students", // The backend resource for 'All' students
  },
  {
    name: "Archives",
    url: "/users/students/archives", // The backend resource for 'Archived' students
  },
];

const ManageStudentsPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State for Lists
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [listOfCoordinators, setListOfCoordinators] = useState([]);

  /**
   * File State
   */
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(""); // 'success' or 'error
  const [programID, setProgramID] = useState(null);

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenImport, setIsOpenImport] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isAssignConfirmOpen, setIsAssignConfirmOpen] = useState(false);

  // Select State
  const [selectedTab, setSelectedTab] = useState(tabLinks[0]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

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

    // Student unique fields
    age: "",
    dateOfBirth: "",
    programID: "",
    coordinatorID: "",
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
        // console.log(listOfProgramsResponse);
        // Set State
        setListOfPrograms(listOfProgramsResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchListOfCoordinators = async () => {
      // Set Loading
      setLoading(true);

      try {
        const listOfCoordinatorsResponse = await getRequest({
          url: "/api/v1/users/coordinators/lists",
        });

        // console.log(listOfCoordinatorsResponse);

        // Set State
        setListOfCoordinators(listOfCoordinatorsResponse);
      } catch (error) {
        console.error(error);
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

    // ! Call Function for Admin, Dean, and Chairperson
    fetchListOfCoordinators();
  }, []);

  // Function to handle row selection
  const handleRowSelection = (ids) => {
    setSelectedRows(ids); // Update state with selected row IDs
  };

  // Function to print selected rows
  const printSelectedRows = () => {
    const selectedData = rows.filter((row) => selectedRows.includes(row.id));
    console.log("Selected Rows:", selectedData);
    alert(JSON.stringify(selectedData, null, 2)); // Show the selected rows in an alert
  };

  // Function to assign student/s to coordinator
  const handleAssign = async () => {
    // Loading State
    setLoading(true);

    try {
      // Ensure a coordinator is selected
      if (!formData.coordinatorID) {
        alert("Please select a coordinator before confirming.");
        return;
      }

      const selectedData = rows.filter((row) => selectedRows.includes(row.id));

      // Extract only the ids from the selectedData and structure them with student_id attribute
      const selectedIds = selectedData.map((student) => ({
        student_id: student.id,
      }));
      // console.log(selectedIds); // Logs the array with each object containing a student_id

      // Prepare payload
      const payload = {
        student_ids: selectedIds,
        coordinator_id: formData.coordinatorID,
      };

      const response = await putRequest({
        url: "/api/v1/users/students/assign-to-coordinator",
        data: payload,
      });

      if (response) {
        // Close Modals
        setIsAssignConfirmOpen(false);
        setIsAssignOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to add new student
  const addStudent = () => {
    // POST METHOD
    postData({
      url: "/users/students",
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

        program_id: formData.programID,
        coordinator_Id: formData.coordinatorID,
        date_of_birth: formData.dateOfBirth,
        age: formData.age,
      },
      resetForm: resetForm,
    });
  };

  // Fuction that updates a student
  const updateStudent = () => {
    // PUT METHOD
    putData({
      url: `/users/students/${selectedStudent["id"]}`,
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

        program_id: formData.programID,
        coordinator_Id: formData.coordinatorID,
        date_of_birth: formData.dateOfBirth,
        age: formData.age,
      },
      selectedData: selectedStudent,
      setIsOpen: setEditIsOpen,
      resetForm: resetForm,
    });
  };

  /**
   * Function that opens a modal for edit
   */
  const handleEditModal = (row) => {
    // Set Select State
    setSelectedStudent(row);

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

      programID: row.program_id,
      coordinatorID: row.coordinator_Id,
      dateOfBirth: row.date_of_birth,
      age: row.age,
    });

    // Open Edit Modal
    setEditIsOpen(true);
  };

  /**
   * Function that deletes a student
   */
  const deleteStudent = () => {
    // DELETE METHOD
    deleteData({
      url: `/users/students/${selectedStudent["id"]}`,
      id: selectedStudent["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedStudent(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getStudentStaticColumns({
        authorizeRole: authorizeRole,
        pathname: location.pathname,
      }),
    [authorizeRole]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getStudentActionColumns(
        authorizeRole,
        handleEditModal,
        handleDeleteModal
      ),
    [authorizeRole]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

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
        url: `/api/v1/users/students/${programID}/upload-students`,
        data: formData,
      });

      setIsOpenImport(false);
      setStatus("success");

      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Tab Change
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    navigate(tab.url); // Update the URL dynamically based on the selected tab
  };

  /**
   * A function that handles the File Change
   */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setStatus(""); // Reset status on file selection
  };

  return (
    <>
      <Page className={`${authorizeRole !== "admin" ? "px-4" : ""}`}>
        <Loader loading={loading} />

        {/* For those roles that is not admin */}
        {authorizeRole !== "admin" && (
          <Section>
            <Heading level={3} text="Manage Students" />
            <Text className="text-md text-blue-950">
              This is where you manage the students.
            </Text>
            <hr className="my-3" />
          </Section>
        )}

        <div className="mt-3">
          <TabGroup>
            <TabList className="flex gap-4">
              {tabLinks.map((tabLink, index) => {
                // ! Do not display Archives if role is not Admin
                if (tabLink.name === "Archives" && authorizeRole !== "admin") {
                  return null;
                }

                return (
                  <Tab
                    key={index}
                    className={`rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none ${
                      selectedTab.name === tabLink.name
                        ? "bg-blue-700 text-white" // Active tab style
                        : "bg-transparent text-blue-700" // Inactive tab style
                    }`}
                    onClick={() => setSelectedTab(tabLink)} // Update selected tab on click
                  >
                    {tabLink.name}
                  </Tab>
                );
              })}
            </TabList>
          </TabGroup>
          {selectedTab.name === "All" && (
            <>
              <ManageHeader
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                addPlaceholder="Add New User"
                showExportButton={false}
                isImportOpen={isOpenImport}
                setIsImportOpen={setIsOpenImport}
              />
              {/* Assign Button */}
              {(authorizeRole === "admin" ||
                authorizeRole === "chairperson") && (
                <div className="my-3">
                  <Button
                    // onClick={() => setIsAssignOpen(!isAssignOpen)}
                    onClick={() => setIsAssignOpen(!isAssignOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                      selectedRows.length > 0
                        ? "bg-green-500 text-white hover:bg-green-600 transition"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    <UserCheck className="w-5 h-5" />
                    Assign Student
                  </Button>
                </div>
              )}

              <DynamicDataGrid
                searchPlaceholder={"Search Student"}
                rows={rows}
                setRows={setRows}
                columns={columns}
                url={selectedTab.url}
                onSelectionModelChange={handleRowSelection} // Handle selection change
                getRowId={(row) => row.id} // Define the row ID
              />
              {/* Modals */}
              {/* Assign Modal */}
              <FormModal
                isOpen={isAssignOpen}
                setIsOpen={setIsAssignOpen}
                modalTitle="Assign Student"
                onSubmit={() => setIsAssignConfirmOpen(!isAssignConfirmOpen)}
              >
                <AssignStudentForm
                  selectedCoordinatorID={formData.coordinatorID}
                  handleSelectedCoordinatorID={handleInputChange}
                  coordinators={listOfCoordinators}
                />
              </FormModal>

              {/* Add Form Modal */}
              <FormModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle="Add Student"
                onSubmit={addStudent}
              >
                <StudentForm
                  method="post"
                  studentInfo={formData}
                  handleStudentInfoChange={handleInputChange}
                  programs={listOfPrograms}
                  coordinators={listOfCoordinators}
                  errors={validationErrors}
                />
              </FormModal>
              {/* Modals */}
              {/* Edit Form Modal */}
              <FormModal
                isOpen={isEditOpen}
                setIsOpen={setEditIsOpen}
                modalTitle="Edit Student"
                onSubmit={updateStudent}
              >
                <StudentForm
                  method="put"
                  studentInfo={formData}
                  handleStudentInfoChange={handleInputChange}
                  programs={listOfPrograms}
                  coordinators={listOfCoordinators}
                  errors={validationErrors}
                />
              </FormModal>
              {/* Delete Form Modal */}
              <DeleteConfirmModal
                open={isDeleteOpen}
                setOpen={setIsDeleteOpen}
                title={`Delete ${selectedStudent["first_name"]}`}
                message="Are you sure you want to delete this student?"
                handleDelete={deleteStudent}
              />

              {/* Assign Form Modal */}
              <AssignConfirmModal
                open={isAssignConfirmOpen}
                setOpen={setIsAssignConfirmOpen}
                title="Assign Student To A Coordinator"
                message="Are you sure you want to assign this/these student/s to the selected coordinator? This action can be reviewed but not undone."
                handleAssign={handleAssign}
              />

              {/* Import Form Modal */}
              <FormModal
                isOpen={isOpenImport}
                setIsOpen={setIsOpenImport}
                modalTitle="Import Students"
                onSubmit={submitFile}
              >
                <ImportStudentForm
                  file={file}
                  set={setFile}
                  status={status}
                  setStatus={setStatus}
                  handleFileChange={handleFileChange}
                  programs={listOfPrograms}
                  programId={programID}
                  setProgramId={setProgramID}
                  withSelection={!(authorizeRole === "chairperson")}
                />
              </FormModal>
            </>
          )}

          {/*! FOR ADMIN ONLY */}
          {selectedTab.name === "Archives" && authorizeRole === "admin" && (
            <>
              <div>Test</div>
            </>
          )}
        </div>
      </Page>
    </>
  );
};

export default ManageStudentsPage;
