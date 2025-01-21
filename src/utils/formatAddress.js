export const getFullAddress = ({
  street,
  barangay,
  city,
  province,
  postalCode
}) => {
  // Check if all required fields are provided, otherwise return a default message


  // Ensure all inputs are strings to avoid errors with trim()
  const cleanStreet = (street || "").trim();
  const cleanBarangay = (barangay || "").trim();
  const cleanCity = (city || "").trim();
  const cleanProvince = (province || "").trim();
  const cleanPostalCode = (postalCode || "").trim();

    // Combine address
  const fullAddress = [cleanStreet, cleanBarangay, cleanCity, cleanProvince, cleanPostalCode].filter(address => address).join(', ');

  // Return the full address
  return fullAddress;
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
