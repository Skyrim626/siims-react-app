// Function that picks color
function pickColor(color = "") {
  // Color variable
  let pickedColor = "";

  /**
   * Switching Colors
   */
  switch (color.toLowerCase()) {
    case "black":
      pickedColor = "black";
      break;
    case "blue":
      pickedColor = "blue-600";
      break;
    case "dark-blue":
      pickedColor = "blue-700";
      break;
    case "gray":
      pickedColor = "gray-600";
      break;
    case "red":
      pickedColor = "red-600";
      break;
    case "white":
      pickedColor = "white";
      break;

    default:
      pickedColor = "black";
  }

  // Return pickedColor;
  return pickedColor;
}

// Function that returns text color
function pickTextColor(color = "") {
  // Color variable
  let pickedTextColor = "text-" + pickColor(color);

  // Return picked text color
  return pickedTextColor;
}

// Function that returns background color
function pickBackgroundColor(color = "") {
  // Background color variable
  let pickedBackgroundColor = "bg-" + pickColor(color);

  // Return picked background color
  return pickedBackgroundColor;
}

// Function that returns hover template string
function pickHoverColor(color = "") {
  // Returns a string template
  return "hover:";
}

// Function that returns hover background color
function pickHoverBackgroundColor(color = "") {

  // Hover background variable
  let pickedHoverBackgroundColor = pickHoverColor() + pickBackgroundColor(color);

  // Returns picked hover background color
  return pickedHoverBackgroundColor

}

// Exporting functions
export { pickTextColor, pickBackgroundColor, pickHoverBackgroundColor };
