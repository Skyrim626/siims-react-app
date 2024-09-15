import React from "react";
import Text from "../common/Text";

// Part of Table Component for Showing Resultss
const TableShowResult = ({ startIndex, endIndex, totalItems }) => {
  return (
    <div className="mt-4">
      <Text>
        Showing result {startIndex} to {endIndex} of {totalItems} results.
      </Text>
    </div>
  );
};

export default TableShowResult;
