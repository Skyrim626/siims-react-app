export function concatenanteAddress(
  street = "",
  barangay = "",
  city_municipality = "",
  province = "",
  postal_code = ""
) {
  // Create an array to hold the parts of the address
  const addressParts = [street, barangay, city_municipality, province, postal_code];

  // Filter out any empty parts and join them with a comma and a space
  const fullAddress = addressParts.filter(part => part.trim() !== "").join(", ");

  // Return the full address
  return fullAddress;
}

export function concatenateLocation(pathName, add) {
  // Split the pathname to remove the trailing part
  const basePath = pathName.split("/").slice(0, -1).join("/");
  // Concatenate the base path with the additional segment
  return `${basePath}/${add}`;
}