// Libraries
import React from "react";
import { Navigate } from "react-router-dom";

// Route Handlers

// Student Layout
import StudentLayout from "../../components/layouts/StudentLayout";

// Student Pages
import StudentDashboardPage from "../../pages/student/StudentDashboardPage";
import ProtectedRoute from "../handlers/ProtectedRoute";

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
      element: <Navigate to={"/student"} />,
    },
    {
      index: true,
      element: <StudentDashboardPage />,
    },
  ],
};

// Exporting routes
export default StudentRoutes;
