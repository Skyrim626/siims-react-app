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

// Function to map endorsement letter request statuses to text color and background color
export const getEndorsementStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-yellow-500", // Yellow background (waiting for chairperson's review)
      };
    case "Pending Approval":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-orange-500", // Orange background (waiting for Dean's decision)
      };
    case "Approved":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-green-500", // Green background (approved by Dean)
      };
      case "Withdrawn":
        return {
          textColor: "text-white", // White text
          backgroundColor: "bg-gray-500", // Gray background (indicates withdrawal)
        };
    case "Rejected":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-red-500", // Red background (rejected by Dean)
      };
    case "Walk-In":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-blue-500", // Blue background (represents action/attention)
      };
    case "Draft":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-gray-500", // Gray background (still in draft by Chairperson)
      };
    default:
      return {
        textColor: "text-black", // Black text for default case
        backgroundColor: "bg-gray-200", // Light gray background for default
      };
  }
};


// Function to map daily time record statuses to text color and background color
export const getTimeRecordStatusColor = (status) => {
  switch (status) {
    case "In":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-green-500", // Green background (working, in)
      };
    case "Out":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-gray-500", // Gray background (out, leaving)
      };
    case "On Break":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-yellow-500", // Yellow background (on break)
      };
    case "Off":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-blue-500", // Blue background (off work)
      };
    case "Overtime":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-red-500", // Red background (overtime)
      };
    case "Leave":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-purple-500", // Purple background (on leave)
      };
    case "Absent":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-orange-500", // Orange background (absent)
      };
    case "Holiday":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-teal-500", // Teal background (holiday)
      };
    case "Late":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-pink-500", // Pink background (late)
      };
    case "Early Out":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-indigo-500", // Indigo background (early out)
      };
    default:
      return {
        textColor: "text-black", // Black text for default case
        backgroundColor: "bg-gray-200", // Light gray background for default
      };
  }
};


// Function to map student status to text color and background color
export const getStudentStatusColor = (status) => {
  switch (status) {
    case "Not Yet Enrolled":
      return {
        textColor: "text-black", // Black text
        backgroundColor: "bg-gray-300", // Light gray background (not yet enrolled)
      };
    case "Enrolled":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-blue-500", // Blue background (enrolled)
      };
    case "Pending Approval":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-yellow-500", // Yellow background (pending approval)
      };
    case "Active":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-green-500", // Green background (active)
      };
    case "Completed":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-teal-500", // Teal background (completed)
      };
    case "Ready For Deployment":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-indigo-500", // Indigo background (ready for deployment)
      };
    case "Dropped Out":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-orange-500", // Orange background (dropped out)
      };
    case "Suspended":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-purple-500", // Purple background (suspended)
      };
    case "Expelled":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-red-500", // Red background (expelled)
      };
    case "Failed":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-pink-500", // Pink background (failed)
      };
    default:
      return {
        textColor: "text-black", // Black text for default case
        backgroundColor: "bg-gray-200", // Light gray background for unknown status
      };
  }
};



// Function to map application status to text color and background color
export const getApplicationStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return {
        textColor: "text-black", // Black text
        backgroundColor: "bg-gray-300", // Light gray background (pending)
      };
    case "Under Review":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-yellow-500", // Yellow background (under review)
      };
    case "Rejected":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-red-500", // Red background (rejected)
      };
    case "Approved":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-green-500", // Green background (approved)
      };
    case "Withdrawn":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-orange-500", // Orange background (withdrawn)
      };
    case "OJT Completed":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-teal-500", // Teal background (OJT completed)
      };
    case "Immersion Completed":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-blue-500", // Blue background (immersion completed)
      };
    case "Expired":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-purple-500", // Purple background (expired)
      };
    case "Ready For Deployment":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-indigo-500", // Indigo background (ready for deployment)
      };
    default:
      return {
        textColor: "text-black", // Black text for default case
        backgroundColor: "bg-gray-200", // Light gray background for unknown status
      };
  }
};


// Function to map document status to text color and background color
export const getDocumentStatusColor = (status) => {


  switch (status) {
    case "Pending":
      return {
        textColor: "text-white", // Black text
        backgroundColor: "bg-orange-500", // Light gray background
      };
    case "Submitted":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-blue-500", // Blue background
      };
    case "Under Review":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-yellow-500", // Yellow background
      };
    case "Approved":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-green-500", // Green background
      };
    case "Rejected":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-red-500", // Red background
      };
    case "Resubmitted":
      return {
        textColor: "text-white", // White text
        backgroundColor: "bg-purple-500", // Purple background
      };
    default:
      return {
        textColor: "text-black", // Black text for default case
        backgroundColor: "bg-gray-200", // Light gray background for unknown status
      };
  }
};
