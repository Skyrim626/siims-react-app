import React from "react";

export default function Heading({
  level = 1,
  text,
  fontStyle = "font-semibold",
  textColor = "text-gray-900",
  className,
}) {
  // Renders a heading
  const renderHeading = () => {
    // Determine the heading tag based on the 'level' prop
    const HeadingTag = `h${level}`;
    let fontSize = "";

    switch (level) {
      case 1:
        fontSize = "text-4xl";
        break;
      case 2:
        fontSize = "text-3xl";
        break;
      case 3:
        fontSize = "text-2xl";
        break;
      case 4:
        fontSize = "text-xl";
        break;
    }

    return (
      <HeadingTag
        className={`${
          fontStyle + " " + textColor + " " + fontSize
        } ${className}`}
      >
        {text}
      </HeadingTag>
    );
  };

  return renderHeading();
}
