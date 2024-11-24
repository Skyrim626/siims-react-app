/**
 * A function that concatenate names to full name.
 * @param {string} firstName 
 * @param {string} middleName 
 * @param {string} lastName 
 * @returns 
 */
export function getFullName(firstName = "", middleName, lastName ="") {
  // Check if middleName is provided
  if (middleName) {
      return `${firstName} ${middleName} ${lastName}`;
  }
  return `${firstName} ${lastName}`;
}