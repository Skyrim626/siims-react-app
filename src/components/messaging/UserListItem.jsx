import React from "react";
import { FaUser } from "react-icons/fa";

const UserListItem = ({ id, fullName, handleGroupClick }) => {
  return (
    <div
      key={id}
      className="p-4 bg-white shadow-sm rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white flex flex-col"
      onClick={() => handleGroupClick(id)}
    >
      <div className="flex items-center">
        <FaUser className="mr-3 text-gray-500" />
        <div>
          <div className="font-bold">{fullName}</div>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
