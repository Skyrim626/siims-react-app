// Utility function to format date
export const formatDate = (dateString, option = "") => {
  const date = new Date(dateString); // Fix: Ensure the date is correctly initialized

  if (option === "secondary") {
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(), // "SEPT"
      day: date.toLocaleDateString("en-US", { day: "numeric" }), // "19"
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }), // "Thurs"
    };
  }

  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};
