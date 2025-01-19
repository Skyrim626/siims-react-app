// Utility function to capitalize the first letter of a given string
export function capitalizeFirstLetter(value) {
  if (typeof value !== 'string') {
      throw new TypeError('Expected a string');
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}
