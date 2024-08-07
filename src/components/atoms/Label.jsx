import React from "react";
import { pickTextColor } from "../../config/style";

export default function Label({
  label,
  labelSize = "small",
  labelColor = "black",
  htmlFor,
  className,
}) {
  // Render Label
  const renderLabel = () => {
    let fontSize = "text-sm";

    // Returns a picked color
    const pickedTextColor = pickTextColor(labelColor);

    // Font Size for label
    switch (labelSize.toLowerCase()) {
      case "small":
        fontSize = "text-sm";
        break;
      case "medium":
        fontSize = "text-md";
        break;
      case "large":
        fontSize = "text-lg";
        break;
      case "extraLarge":
        fontSize = "text-xl";
        break;
      default:
        fontSize = "text-sm";
    }

    // Return label
    return (
      <label
        htmlFor={htmlFor}
        className={`${fontSize} ${pickedTextColor} ${className}`}
      >
        {label}
      </label>
    );
  };

  // Return Label
  return <>{renderLabel()}</>;
}
