// statusColors.js

/**
 * Statuses:
 * - Pending                -> bg-yellow-500      - text-yellow-100           -
 * - Approved               -> bg-green-600       - text-green-100            -
 * - Rejected               -> bg-red-600         - text-red-100              -
 * - Incomplete             -> bg-gray-600        - text-gray-100             -
 * - Need Revisions         -> bg-purple-600      - text-purple-100           -
 * - Withdrawn              -> bg-blue-600        - text-blue-100             -
 * - Applying               -> bg-orange-600      - text-orange-100           -
 * - Completed              -> bg-green-600       - text-green-100            -
 * - Not yet applied        -> bg-gray-600        - text-gray-100             -
 * - Applied                -> bg-blue-600        - text-blue-100             -
 * - Deployed               -> bg-indigo-600      - text-indigo-100           -
 * - Ready for deployment   -> bg-teal-600        - text-teal-100             -
 */

// Function to map document status to text color class
export const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'text-green-600'; 
    case 'Rejected':
      return 'text-red-600'; 
    case 'Need Revisions':
      return 'text-purple-600'; 
    case 'Withdrawn':
      return 'text-blue-600'; 
    case 'Incomplete':
      return 'text-gray-600'; 
    case 'Pending':
      return 'text-yellow-600'; 
    case 'Applying':
      return 'text-orange-600'; 
    case 'Completed':
      return 'text-green-600'; 
    case 'Not Yet Applied':
      return 'text-gray-600'; 
    case 'Applied':
      return 'text-blue-600'; 
    case 'Ready for Deployment':
      return 'text-teal-600'; 
    case 'Deployed':
      return 'text-indigo-600'; 
    default:
      return 'text-gray-600'; 
  }
};

// Function to map document status to background color class
export const getStatusBgColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100';
    case 'Rejected':
      return 'bg-red-100';
    case 'Need Revisions':
      return 'bg-purple-100';
    case 'Withdrawn':
      return 'bg-blue-100';
    case 'Incomplete':
      return 'bg-gray-100';
    case 'Pending':
      return 'bg-yellow-100';
    case 'Applying':
      return 'bg-orange-100';
    case 'Completed':
      return 'bg-green-100';
    case 'Not Yet Applied':
      return 'bg-gray-200';
    case 'Applied':
      return 'bg-blue-100';
    case 'Ready for Deployment':
      return 'bg-teal-100';
    case 'Deployed':
      return 'bg-indigo-100';
    default:
      return 'bg-gray-200';
  }
};
