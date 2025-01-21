import React from "react";
import Text from "../../../components/common/Text";

const Container = ({
  title = "No Title",
  totalData = 0,
  borderTopColor,
  children,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center bg-white rounded-lg border-t-4 px-6 py-8 ${borderTopColor} shadow-lg transition-all hover:shadow-xl hover:scale-105`}
    >
      <Text className="text-lg font-semibold text-gray-700">{title}</Text>
      <div className="flex items-center gap-2 mt-4">
        {children}
        <Text className="text-4xl font-bold text-gray-900">{totalData}</Text>
      </div>
    </div>
  );
};

export default Container;
