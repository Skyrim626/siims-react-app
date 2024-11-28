export default function getFullName(firstName = "", middleName = "", lastName = "") {
  // Ensure all inputs are strings to avoid errors with trim()
  const cleanFirstName = (firstName || "").trim();
  const cleanMiddleName = (middleName || "").trim();
  const cleanLastName = (lastName || "").trim();

  // Combine the names, ensuring no extra spaces if a name is missing
  const fullName = [cleanFirstName, cleanMiddleName, cleanLastName]
    .filter(name => name) // Remove empty values
    .join(" "); // Join the non-empty values with a space

  return fullName;
}
