// A function that generates an ID
// First 4 numbers is based on the current year
function generateID() {
  const year = new Date().getFullYear(); // Get the current year (first 4 digits)
  const randomDigits = Math.floor(1000000 + Math.random() * 9000000); // Generate a random 7-digit number
  return `${year}${randomDigits}`;
}

// A function that generates a random password
function generatePassword(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  
  return password;
}

// Exporting the generateID function
export {
  generateID,
  generatePassword
};

// Example usage
// Testing
// const newID = generateID();
// console.log(newID); // Example output: 202412345678