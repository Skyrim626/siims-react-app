import React from "react";

/**
 * TextBox Component
 * This is a reusable component that renders a box with customizable content and styling.
 * The box can display any children elements passed to it and has a customizable border color.
 *
 * Props:
 * @param {string} className - Additional class names to style the box (default styles are applied).
 * @param {string} borderColor - A specific border color class to apply to the box.
 * @param {React.ReactNode} children - The content to be rendered inside the box.
 *
 * @returns {JSX.Element} The styled text box.
 */
export default function TextBox({
  children,
  className = "gap-2 bg-white rounded-lg border-t-4 px-5 py-8",
  borderColor = "border-t-blue-700", // Default border color is blue
}) {
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center ${borderColor} ${className}`}
      >
        {/* Render the children passed to the TextBox component */}
        {children}
      </div>
    </>
  );
}
