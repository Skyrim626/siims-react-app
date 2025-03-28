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
import StudentForm from "../components/forms/StudentForm";
import FormModal from "../components/modals/FormModal";
import { getRequest, postFormDataRequest, putRequest } from "../api/apiHelpers";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import ImportStudentForm from "./admin/forms/ImportStudentForm";
import { HelpCircle, UserCheck } from "lucide-react";
import AssignConfirmModal from "../components/modals/AssignConfirmModal";
import AssignStudentForm from "../components/forms/AssignStudentForm";
import StatusListModal from "../components/modals/StatusListModal";
import { getStudentStatusColor } from "../utils/statusColor";
import {
  getStudentActionColumns,
  getStudentStaticColumns,
} from "../utils/columns/studentColumns";
import DeployStudentButton from "../components/tables/DeployStudentButton";
import CoordinatorManageStudentsSettings from "../components/settings/CoordinatorManageStudentsSettings";
import { loginInfo } from "../formDefaults/loginInfo";
import { personalInfo } from "../formDefaults/personalInfo";
import { addressInfo } from "../formDefaults/addressInfo";
import RoleBasedView from "../components/common/RoleBasedView";
import StudentContentModal from "../components/modals/StudentContentModal";
import VerifyStudentForm from "../components/forms/VerifyStudentForm";

// Tabs Links
const tabLinks = [
  {
    name: "All",
    url: "/users/students", // The backend resource for 'All' students
    authorizeRoles: ["admin", "dean", "chairperson", "coordinator"],
  },
  {
    name: "Not Yet Applied",
    url: "/users/students/not-yet-applied",
    authorizeRoles: ["admin", "coordinator"],
  },
  {
    name: "Pending Approval",
    url: "/users/students/pending-approval",
    authorizeRoles: ["admin", "coordinator"],
  },
  {
    name: "Enrolled",
    url: "/users/students/enrolled", // The backend resource for 'All' students
    authorizeRoles: ["admin", "coordinator"],
  },
  {
    name: "Ready For Deployment",
    url: "/users/students/ready-for-deployment", // The backend resource for 'All' students
    authorizeRoles: ["admin", "coordinator"],
  },
  {
    name: "Active",
    url: "/users/students/active", // The backend resource for 'All' students
    authorizeRoles: ["admin", "coordinator"],
  },
  {
    name: "Completed",
    url: "/users/students/completed", // The backend resource for 'All' students
    authorizeRoles: ["admin", "coordinator"],
  },
  {
    name: "Archived",
    url: "/users/students/archived", // The backend resource for 'Archived' students
    authorizeRoles: ["admin"],
  },
];

const ManageStudentsPage = ({ authorizeRole }) => {
  // Loading State
  const [loading, setLoading] = useState(false);

  // Container State for Lists
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [listOfCoordinators, setListOfCoordinators] = useState([]);
  const [listOfStudentStatuses, setListofStudentStatuses] = useState([]);

  /**
   * File State
   */
  const [file, setFile] = useState(null);
  const [fileVerify, setFileVerify] = useState(null);
  const [status, setStatus] = useState(""); // 'success' or 'error
  const [program_id, setProgramID] = useState(null);

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenImport, setIsOpenImport] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isAssignConfirmOpen, setIsAssignConfirmOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const [isContentOpen, setIsContentOpen] = useState(false);

  // Select State
  const [activeTab, setActiveTab] = useState(tabLinks[0]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

  // Use the useForm hook to manage form data
  const { formData, handleInputChange, resetForm, setFormValues } = useForm({
    ...loginInfo,
    ...personalInfo,
    ...addressInfo,

    // Student unique fields
    age: "",
    date_of_birth: "",
    program_id: "",
    coordinator_id: "",
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

        // console.log("Current Progrma: ", currentProgramResponse);

        if (currentProgramResponse) {
          setProgramID(currentProgramResponse);
          setFormValues({
            ...formData, // Ensure this has all fields
            program_id: currentProgramResponse, // Update program_id only
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the student statuses colors
    const fetchStudentStatusColor = async () => {
      // Set Loading State
      setLoading(true);
      try {
        const response = await getRequest({
          url: "/api/v1/statuses/student-status-lists",
        });

        if (response) {
          setListofStudentStatuses(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // ! Call to All
    fetchStudentStatusColor();

    // ! Call Function for Admin and Dean Only
    if (authorizeRole === "admin" || authorizeRole === "dean") {
      fetchListOfPrograms();
    }
    // ! Default: For Chairperson
    else if (authorizeRole === "chairperson") {
      fetchCurrentProgramId();
    }

    // ! Call Function for Admin, Dean, and Chairperson
    if (
      authorizeRole === "admin" ||
      authorizeRole === "dean" ||
      authorizeRole === "chairperson"
    ) {
      fetchListOfCoordinators();
    }
  }, []);

  // Function to handle row selection
  const handleRowSelection = (ids) => {
    setSelectedRows(ids); // Update state with selected row IDs
  };

  // Function to assign student/s to coordinator
  const handleAssign = async () => {
    // Loading State
    setLoading(true);

    try {
      // Ensure a coordinator is selected
      if (!formData.coordinator_id) {
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
        coordinator_id: formData.coordinator_id,
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

  // ! FOR COORDINATOR ONLY
  const handleDeployStudents = async (selectedIds) => {
    // Set loading state
    setLoading(true);

    try {
      const selectedData = rows.filter((row) => selectedRows.includes(row.id));
      // console.log(selectedData);

      // Extract only the IDs from the selected data
      const selectedIds = selectedData.map((row) => row.id);

      // Prepare payload containing the selected user IDs
      const payload = { ids: Array.from(selectedIds) };
      // Perform PUT request to archive the selected users
      const response = await putRequest({
        url: "/api/v1/users/students/mark-ready-for-deployment",
        data: payload,
      });

      if (response) {
        // Update the local students state to remove deleted students
        setRows((prevStudents) =>
          prevStudents.filter((student) => !selectedIds.includes(student.id))
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to add new student
  const addStudent = () => {
    console.log("Form Data: ", formData);

    // POST METHOD
    postData({
      url: "/users/students",
      payload: formData,
      resetForm: resetForm,
    });
  };

  // Fuction that updates a student
  const updateStudent = () => {
    // PUT METHOD
    putData({
      url: `/users/students/${selectedStudent["id"]}`,
      payload: formData,
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
      ...row,
      gender: row.gender ? row.gender.toLowerCase() : row.gender,
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

  const handleStudentContentModal = (row) => {
    setIsContentOpen(true);
    setSelectedStudent(row);
  };
  // Static Columns
  const staticColumns = useMemo(
    () =>
      getStudentStaticColumns({
        authorizeRole: authorizeRole,
        pathname: location.pathname,
        handleStudentContentModal: handleStudentContentModal,
      }),
    [authorizeRole, activeTab]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getStudentActionColumns({
        authorizeRole,
        handleEditModal,
        handleDeleteModal,
        activeTab,
        pathname: location.pathname,
      }),
    [authorizeRole, activeTab]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  // Submit Verify File
  const submitVerifyFile = async (event) => {
    event.preventDefault();

    if (!fileVerify) {
      setStatus("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileVerify);

    try {
      // Set Loading
      setLoading(true);

      // console.log(`/api/v1/users/students/verify`);

      // Assuming your backend has an endpoint for file upload
      const response = await postFormDataRequest({
        url: `/api/v1/users/students/verify`,
        data: formData,
      });

      if (response) {
        setIsVerifyOpen(false);
        setStatus("success");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
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
      console.log(`/api/v1/users/students/${program_id}/upload-students`);

      // Assuming your backend has an endpoint for file upload
      const response = await postFormDataRequest({
        url: `/api/v1/users/students/${program_id}/upload-students`,
        data: formData,
      });

      // selectedProgramId

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

  /**
   * A function that handles the File Change
   */
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setStatus(""); // Reset status on file selection
  };

  const handleFileVerifyChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileVerify(selectedFile);
    setStatus("");
  };

  return (
    <>
      <Page className={`${authorizeRole !== "admin" ? "px-4" : ""}`}>
        <Loader loading={loading} />

        {/* For those roles that is not admin */}
        {authorizeRole !== "admin" && (
          <Section>
            <div className="flex justify-between items-center">
              <div>
                <Heading level={3} text="Manage Students" />
                <Text className="text-md text-blue-950">
                  This is where you manage the students.
                </Text>
              </div>

              <div>
                <Button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                  onClick={() => setIsHelpOpen(!isHelpOpen)}
                >
                  <HelpCircle size={25} />
                </Button>
              </div>
            </div>
            <hr className="my-3" />
          </Section>
        )}

        {/* FOR COORDINATORS ONLY */}
        {authorizeRole === "coordinator" && (
          <CoordinatorManageStudentsSettings />
        )}

        <div className="mt-3">
          <TabGroup>
            <TabList className="flex gap-4 mb-5">
              {tabLinks.map((tab, index) => {
                // ! Do not display Archives if role is not Admin
                /* if (tab.name === "Archived" && authorizeRole !== "admin") {
                  return null;
                } */

                // Check Roles is not included for this
                if (!tab.authorizeRoles.includes(authorizeRole)) {
                  return null;
                }

                return (
                  <Tab
                    key={index}
                    className={`rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none ${
                      activeTab.name === tab.name
                        ? "bg-blue-700 text-white" // Active tab style
                        : "bg-transparent text-blue-700" // Inactive tab style
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.name}
                  </Tab>
                );
              })}
            </TabList>

            {activeTab.name === "All" && (
              <>
                {(authorizeRole === "admin" ||
                  authorizeRole === "dean" ||
                  authorizeRole === "chairperson") && (
                  <ManageHeader
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    addPlaceholder="Add New User"
                    showExportButton={false}
                    isImportOpen={isOpenImport}
                    setIsImportOpen={setIsOpenImport}
                    isVerifyOpen={isVerifyOpen}
                    setIsVerifyOpen={setIsVerifyOpen}
                    showVerifyButton={authorizeRole === "admin"}
                  />
                )}
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

                {/* Modals */}
                <RoleBasedView
                  roles={["coordinator"]}
                  authorizeRole={authorizeRole}
                >
                  {isContentOpen && (
                    <StudentContentModal
                      open={isContentOpen}
                      setOpen={setIsContentOpen}
                      student={selectedStudent}
                      location={location.pathname}
                    />
                  )}
                </RoleBasedView>

                {/* Assign Modal */}
                <FormModal
                  isOpen={isAssignOpen}
                  setIsOpen={setIsAssignOpen}
                  modalTitle="Assign Student"
                  onSubmit={() => setIsAssignConfirmOpen(!isAssignConfirmOpen)}
                >
                  <AssignStudentForm
                    selectedCoordinatorID={formData.coordinator_id}
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
                    authorizeRole={authorizeRole}
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
                    programId={program_id}
                    setProgramId={setProgramID}
                    withSelection={!(authorizeRole === "chairperson")}
                  />
                </FormModal>

                {/* Import Verify Form Modal */}
                <FormModal
                  isOpen={isVerifyOpen}
                  setIsOpen={setIsVerifyOpen}
                  modalTitle="Verify Students"
                  onSubmit={submitVerifyFile}
                >
                  <VerifyStudentForm
                    file={fileVerify}
                    setFileType={setFileVerify}
                    status={status}
                    setStatus={setStatus}
                    handleFileChange={handleFileVerifyChange}
                  />
                </FormModal>
              </>
            )}

            {/*! FOR ADMIN ONLY */}
            {activeTab.name === "Archives" && authorizeRole === "admin" && (
              <>
                <div>Test</div>
              </>
            )}

            {/* FOR COORDINATOR ONLY */}
            {activeTab.name === "Ready For Deployment" &&
              authorizeRole === "coordinator" && (
                <>
                  <DeployStudentButton
                    onClick={() => handleDeployStudents()}
                    disabled={selectedRows.length === 0}
                  />
                </>
              )}

            <DynamicDataGrid
              searchPlaceholder={"Search Student"}
              rows={rows}
              setRows={setRows}
              columns={columns}
              url={activeTab.url} // B  t here it didnt pass the new url
              onSelectionModelChange={handleRowSelection} // Handle selection change
              getRowId={(row) => row.id} // Define the row ID
              requestedBy={authorizeRole}
            />
          </TabGroup>
        </div>

        {isHelpOpen && (
          <StatusListModal
            title={"Student Status Color Descriptions"}
            isOpen={isHelpOpen}
            setIsOpen={setIsHelpOpen}
            getStatusColor={getStudentStatusColor}
            statusLists={listOfStudentStatuses}
          />
        )}
      </Page>
    </>
  );
};

export default ManageStudentsPage;
