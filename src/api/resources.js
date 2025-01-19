/**
 * @file apiRoutes.js
 * @description Centralized configuration file for defining API route paths used in the application.
 *              This ensures consistency and maintainability by providing a single source for managing API endpoints.
 * @version 1.0
 */

// GET API Route Paths
export const GET_API_ROUTE_PATH = {
  /**
   * Endpoint for fetching all document types.
   */
  document_types: "/document-types",

  /**
   * Endpoint for importing and assigning students.
   */
  import_students_assign: "/api/v1/users/students/import-students-assign",

  /**
   * Endpoint for students.
   */
  students: '/users/students',

  /**
   * Endpoint for importing and assigning sections.
   */
  sections: "/api/v1/sections",

  /**
   * Endpoint for retrieving work types.
   */
  work_types: "/api/v1/work-types",

  /**
   * Endpoint for retrieving companies.
   */
  companies: "/users/v2/companies",

  /**
   * Endpoint for retrieving supervisors.
   */
  supervisors: "/users/v2/supervisors",

  /**
   * Endpoint for retrieving deans.
   */
  deans: "/users/v2/deans",

   /**
   * Endpoint for retrieving chairpersons.
   */
   chairpersons: "/users/v2/chairpersons",

   /**
   * Endpoint for retrieving coordinators.
   */
   coordinators:"/users/v2/coordinators",

  /**
   * Endpoint for retrieving company offices.
   */
  company_offices: '/api/v1/v2/offices/get-company-offices',

  /**
   * Endpoint for retrieving sections.
   */
  sections: '/api/v1/sections',
};

// DELETE API Route Paths
export const DELETE_API_ROUTE_PATH = {
  /**
   * Endpoint for creating new coordinators.
   */
  coordinators: "/users/v2/coordinators",
}

// POST API Route Paths
export const POST_API_ROUTE_PATH = {
  /**
   * Endpoint for creating new document types.
   */
  document_types: "/document-types",

  /**
   * Endpoint for creating new coordinators.
   */
  coordinators: "/users/v2/coordinators",

  /**
   * Endpoint for importing and assigning sections.
   */
  sections: "/sections",
};

// PUT API Route Paths
export const PUT_API_ROUTE_PATH = {
  /**
   * Endpoint for updating existing document types.
   */
  document_types: "/document-types",

  /**
   * Endpoint for updating new coordinators.
   */
  coordinators: "/users/v2/coordinators",

  /**
   * Endpoint for importing and assigning students with updates.
   */
  import_students_assign: "/api/v1/users/students/import-students-assign",

  /**
   * Endpoint for updating existing companies.
   */
  companies: "/users/v2/companies",

  /**
   * Endpoint for updating existing supervisor.
   */
  supervisors: "/users/v2/supervisors",

  /**
   * Endpoint for updating existing deans.
   */
  deans: "/users/v2/deans",

  /**
   * Endpoint for updating existing chairpersons.
   */
  chairpersons: "/users/v2/chairpersons"
};
