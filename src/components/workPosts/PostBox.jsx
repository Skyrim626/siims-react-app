import React from "react";
import Text from "../common/Text";

const PostBox = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md mb-3">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <Text className="text-sm mt-1">
          Browse Job Lists for Internship and Immersion
        </Text>
      </div>
    </header>
  );
};

export default PostBox;
