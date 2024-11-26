import React from "react";
import "../../css/Loader.css";

const Loader = ({ loading, size = 50, color = "#fff" }) => {
  if (!loading) return null;

  return (
    <div className="loader-backdrop">
      <div
        className="loader-spinner"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTopColor: color,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
    </div>
  );
};

export default Loader;
