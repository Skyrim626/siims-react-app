// Libraries
import React from "react";
import { Navigate } from "react-router-dom";

// Route Handlers

// Student Layout
import StudentLayout from "../../components/layouts/StudentLayout";

// Student Pages
import StudentHomePage from "../../pages/student/StudentHomePage";
import ProtectedRoute from "../handlers/ProtectedRoute";
import StudentProfilePage from "../../pages/student/StudentProfilePage";

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
      element: <StudentHomePage />,
    },
    {
      path: "profile",
      element: <StudentProfilePage />,
    },
  ],
};

// Exporting routes
export default StudentRoutes;
