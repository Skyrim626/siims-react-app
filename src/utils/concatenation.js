
export function concatenateLocation(pathName, add) {
  // Split the pathname to remove the trailing part
  const basePath = pathName.split("/").slice(0, -1).join("/");
  // Concatenate the base path with the additional segment
  return `${basePath}/${add}`;
}