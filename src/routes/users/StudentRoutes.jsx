// Libraries
import { Navigate } from "react-router-dom";

// Route Handlers

// Student Layout
import StudentLayout from "../../components/layouts/StudentLayout";

// Student Pages
import StudentHomePage from "../../pages/student/StudentHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import StudentProfilePage from "../../pages/student/StudentProfilePage";
import StudentApplyJobPage from "../../pages/student/StudentApplyJobPage";
import StudentRequestEndorsementPage from "../../pages/student/StudentRequestEndorsementPage";
import StudentProgramPage from "../../pages/student/StudentProgramPage";
import StudentManageDtrPage from "../../pages/student/StudentManageDtrPage";
import StudentViewEvaluationPage from "../../pages/student/StudentViewEvaluationPage";

// Routes for Student
const StudentRoutes = {
  path: "my",
  element: (
    <ProtectedRoute roleAllowed={"student"}>
      <StudentLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Navigate to={"/my"} />,
    },
    {
      index: true,
      element: <StudentHomePage />,
    },
    {
      path: "profile",
      element: <StudentProfilePage />,
    },
    {
      path: "apply/:job_id",
      element: <StudentApplyJobPage />,
    },
    {
      path: "apply/:job_id/request-endorsement",
      element: <StudentRequestEndorsementPage />,
    },
    {
      path: "program",
      element: <StudentProgramPage />,
    },
    {
      path: "daily-time-records",
      element: <StudentManageDtrPage />,
    },
    {
      path: "view-evaluations",
      element: <StudentViewEvaluationPage />,
    },
  ],
};

// Exporting routes
export default StudentRoutes;
