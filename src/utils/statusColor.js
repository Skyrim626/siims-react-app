// statusColors.js

// Function to map document status to color class
export const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'text-green-600'; // Approved = green
    case 'Rejected':
      return 'text-red-600'; // Rejected = red
    case 'Need Revisions':
      return 'text-yellow-600'; // Need Revisions = yellow
    case 'Withdrawn':
      return 'text-gray-600'; // Withdrawn = gray
    case 'Incomplete':
      return 'text-gray-500'; // Incomplete = light gray
    case 'Pending':
    default:
      return 'text-blue-600'; // Pending = blue
  }
};
