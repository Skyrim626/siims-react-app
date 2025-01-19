import React, { useEffect, useMemo, useState } from "react";
import Page from "../../components/common/Page";
import RoleBasedView from "../../components/common/RoleBasedView";
import StudentsHeaderSection from "./StudentsHeaderSection";
import Loader from "../../components/common/Loader";
import { getRequest } from "../../api/apiHelpers";
import { HelpCircle, UserCheck } from "lucide-react";
import StatusListModal from "../../components/modals/StatusListModal";
import { getStudentStatusColor } from "../../utils/statusColor";
import useForm from "../../hooks/useForm";
import { loginInfo } from "../../formDefaults/loginInfo";
import { personalInfo } from "../../formDefaults/personalInfo";
import { addressInfo } from "../../formDefaults/addressInfo";
import CoordinatorManageStudentsSettings from "../../components/settings/CoordinatorManageStudentsSettings";
import StatusDropdown from "../../components/dropdowns/StatusDropdown";
import ManageHeader from "../../components/common/ManageHeader";
import DeployStudentButton from "../../components/tables/DeployStudentButton";
import DynamicDataGrid from "../../components/tables/DynamicDataGrid";
import { GET_API_ROUTE_PATH } from "../../api/resources";
import {
  getStudentActionColumns,
  getStudentStaticColumns,
} from "../../utils/columns/_v2_studentColumns";
import FormModal from "../../components/modals/FormModal";
import AssignStudentForm from "../../components/forms/AssignStudentForm";
import AssignConfirmModal from "../../components/modals/AssignConfirmModal";
import { Button } from "@headlessui/react";

const ManageStudentsPage = ({ authorizeRole }) => {
  /**
   *
   * Loading State
   *
   *
   */
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   * Container State
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
  const [dataGridUrl, setDataGridUrl] = useState(GET_API_ROUTE_PATH.students);

  /**
   *
   *
   * Modal State
   *
   */
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAssignConfirmOpen, setIsAssignConfirmOpen] = useState(false);

  /**
   *
   * Select State
   *
   *
   */
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

  /**
   *
   * Container State
   *
   */
  const [options, setOptions] = useState([]); // Student Status Options
  const [listOfCoordinators, setListOfCoordinators] = useState([]);
  const [listOfStudentStatuses, setListofStudentStatuses] = useState([]);
  const [listOfPrograms, setListOfPrograms] = useState([]);
  const [programID, setProgramID] = useState(null);

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
   *
   * FUNCTIONS
   *
   *
   */
  const fetchData = async () => {
    setLoading(true);

    try {
      // Fetch data concurrently if they don't depend on each other
      const fetchPromises = [
        getRequest({ url: "/api/v1/statuses/student-status-lists" }).then(
          (response) => {
            // console.log(response);

            setOptions((prev) => [
              { id: "all", name: "All" }, // Default option
              { id: "archived", name: "Archived" }, // Default option
              ...response.map((status) => ({
                id: status.name.toLowerCase(), // Ensure the ID is a string (if necessary)
                name: status.name, // Use the name field from the response
              })),
            ]);

            setListofStudentStatuses(response);
          }
        ),
      ];

      // Role-specific logic
      if (authorizeRole === "admin" || authorizeRole === "dean") {
        fetchPromises.push(
          getRequest({ url: "/api/v1/programs/lists" }).then(setListOfPrograms)
        );
      } else if (authorizeRole === "chairperson") {
        fetchPromises.push(
          getRequest({
            url: "/api/v1/users/chairpersons/current-program-id",
          }).then((response) => {
            setProgramID(response);
            setFormValues((prev) => ({ ...prev, program_id: response }));
          })
        );
      }

      if (
        authorizeRole === "admin" ||
        authorizeRole === "dean" ||
        authorizeRole === "chairperson"
      ) {
        fetchPromises.push(
          getRequest({ url: "/api/v1/users/coordinators/lists" }).then(
            setListOfCoordinators
          )
        );
      }

      // Wait for all fetches
      await Promise.all(fetchPromises);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
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

  // Function to handle row selection
  const handleRowSelection = (ids) => {
    setSelectedRows(ids); // Update state with selected row IDs
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
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedStudent(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  /**
   *
   *
   * USE EFFECTS
   *
   *
   */
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDataGridUrl(
      selectedStatus === "archived"
        ? `${GET_API_ROUTE_PATH.students}?status=archived`
        : GET_API_ROUTE_PATH.students
    );
  }, [selectedStatus]);

  /**
   *
   *
   * Columns
   *
   *
   *
   */
  const staticColumns = useMemo(
    () =>
      getStudentStaticColumns({
        authorizeRole: authorizeRole,
        pathname: location.pathname,
      }),
    [authorizeRole, selectedStatus]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getStudentActionColumns({
        authorizeRole,
        handleEditModal,
        handleDeleteModal,
        pathname: location.pathname,
      }),
    [authorizeRole, selectedStatus]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  // Check Loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      {/* Modal State */}
      {isHelpOpen && (
        <StatusListModal
          title={"Student Status Color Descriptions"}
          isOpen={isHelpOpen}
          setIsOpen={setIsHelpOpen}
          getStatusColor={getStudentStatusColor}
          statusLists={listOfStudentStatuses}
        />
      )}

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

      {/* Assign Form Modal */}
      <AssignConfirmModal
        open={isAssignConfirmOpen}
        setOpen={setIsAssignConfirmOpen}
        title="Assign Student To A Coordinator"
        message="Are you sure you want to assign this/these student/s to the selected coordinator? This action can be reviewed but not undone."
        handleAssign={handleAssign}
      />

      {/* Main Page */}
      <Page className={`${authorizeRole !== "admin" ? "px-4" : ""}`}>
        <div className="mt-3 flex items-center justify-end">
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
          >
            <HelpCircle size={25} />
          </Button>
        </div>

        <RoleBasedView
          authorizeRole={authorizeRole}
          roles={["chairperson", "dean", "coordinator"]}
        >
          <StudentsHeaderSection />
        </RoleBasedView>

        <RoleBasedView roles={["coordinator"]} authorizeRole={authorizeRole}>
          <CoordinatorManageStudentsSettings />
        </RoleBasedView>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <StatusDropdown
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              options={options}
            />

            {selectedStatus === "all" && (
              <RoleBasedView
                authorizeRole={authorizeRole}
                roles={["admin", "dean", "chairperson"]}
              >
                <ManageHeader
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  addPlaceholder="Add New Student"
                  showExportButton={false}
                  showImportButton={false}
                />
              </RoleBasedView>
            )}
          </div>

          {/* Assign Button */}

          <div className="flex items-center gap-3">
            <RoleBasedView
              authorizeRole={authorizeRole}
              roles={["admin", "chairperson"]}
            >
              <div className="my-3">
                <Button
                  onClick={() => setIsAssignOpen(!isAssignOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                    selectedRows.length > 0
                      ? "bg-green-500 text-white hover:bg-green-600 transition"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  disabled={!(selectedRows.length > 0)}
                >
                  <UserCheck className="w-5 h-5" />
                  Assign Student
                </Button>
              </div>
            </RoleBasedView>

            {selectedStatus === "ready for deployment" && (
              <>
                <RoleBasedView
                  authorizeRole={authorizeRole}
                  roles={["coordinator", "admin"]}
                >
                  <>
                    <DeployStudentButton
                      onClick={() => handleDeployStudents()}
                      disabled={selectedRows.length === 0}
                    />
                  </>
                </RoleBasedView>
              </>
            )}
          </div>

          <DynamicDataGrid
            searchPlaceholder={"Search Student"}
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={dataGridUrl} // B  t here it didnt pass the new url
            onSelectionModelChange={handleRowSelection} // Handle selection change
            getRowId={(row) => row.id} // Define the row ID
            requestedBy={authorizeRole}
          />
        </div>
      </Page>
    </>
  );
};

export default ManageStudentsPage;
