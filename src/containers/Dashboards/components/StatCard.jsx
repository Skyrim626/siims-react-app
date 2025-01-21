import { Users } from "lucide-react";
import React from "react";
import Text from "../../../components/common/Text";

const StatCard = ({ icon, label, value }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all">
      <div className="flex items-center gap-2">
        {icon}
        <Text className="font-semibold text-gray-800">{label}</Text>
      </div>
      <Text className="text-2xl font-bold text-gray-900">{value}</Text>
    </div>
  );
};

export default StatCard;
