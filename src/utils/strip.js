export function stripLocation(pathname = "", remove = "") {
  // Check if the pathname ends with the substring to be removed
  if(pathname.endsWith(remove)) {
    // If it does, return the pathname without the specified substring
    return pathname.slice(0, -remove.length);
  }

  // If the pathname doesn't end with the specified substring, return it unchanged
  return pathname;
}

