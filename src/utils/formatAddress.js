export const getFullAddress = ({
  street,
  barangay,
  city,
  province,
  postalCode
}) => {
  // Check if all required fields are provided, otherwise return a default message
  if (!street || !barangay || !city || !province || !postalCode) {
    // return "Incomplete address information";
    return "No Address Info";
  }

  // Return the full address in a readable format for the Philippines
  return `${street}, Barangay ${barangay}, ${city}, ${province}, ${postalCode}, Philippines`;
};

// Example usage:
/* const address = getFullAddress({
  street: "123 Mabini St.",
  barangay: "Barangay 5",
  city: "Manila",
  province: "Metro Manila",
  postalCode: "1000"
});

console.log(address);  */
// Output: "123 Mabini St., Barangay 5, Manila, Metro Manila, 1000, Philippines"
