import React from "react";
import { getCoverImage } from "../../../utils/imageHelpers";

const Header = ({ cover_image_url }) => {
  return (
    <div className="relative w-full h-72 bg-gray-200">
      <img
        src={getCoverImage(cover_image_url)} // Use external default cover image URL
        alt={`Cover Photo`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
};

export default Header;
