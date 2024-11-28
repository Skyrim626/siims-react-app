export default function getFullName(firstName, middleName = '', lastName = '') {
  // Combine the names, ensuring no extra spaces if a name is missing
  let fullName = firstName.trim();

  if (middleName.trim()) {
    fullName += ` ${middleName.trim()}`;
  }

  if (lastName.trim()) {
    fullName += ` ${lastName.trim()}`;
  }

  return fullName;
}
