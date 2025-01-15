/**
 * @file tabLinks.js
 * @description Configuration file for managing tab link definitions in the application.
 *              This file centralizes the definition of all tab-related links, ensuring
 *              consistency and easier maintenance.
 * @author 
 * @version 1.0
 */

// Import the backend API route paths
// This ensures all API endpoints are managed from a single source for consistency.
import { GET_API_ROUTE_PATH } from "../api/resources";

/**
 * Configuration object for tab links.
 * Each property represents a resource, containing an array of tabs with metadata.
 */
const tabLinks = {
  /**
   * Tab links for the 'Document Types' resource.
   * Defines the tabs to be displayed and their associated backend routes and access roles.
   */
  document_types: [
    {
      // Tab name to display in the UI
      name: "All",
      
      // API endpoint for retrieving all document types
      url: GET_API_ROUTE_PATH.document_types,
      
      // Roles authorized to access this tab
      authorizeRoles: ["admin", "osa"],
    },
    {
      // Tab name for archived document types
      name: "Archived",
      
      // API endpoint with query parameters for archived document types
      url: `${GET_API_ROUTE_PATH.document_types}?status=archived`,
      
      // Roles authorized to access this tab
      authorizeRoles: ["admin", "osa"],
    },
  ],
};

// Export the tabLinks object for use in other parts of the application
export default tabLinks;
