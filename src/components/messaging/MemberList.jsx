import React from "react";

// DEFAULT URL
const defaultProfileUrl =
  "https://images.unsplash.com/photo-1635795874662-139d7ce9d7d2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const MemberList = ({ member, togglePerson }) => {
  return (
    <div
      key={member.id}
      className="flex items-center cursor-pointer"
      onClick={() => togglePerson(member.id)}
    >
      <img
        src={member.profile || defaultProfileUrl}
        alt={member.full_name}
        className="w-8 h-8 rounded-full mr-3"
      />
      <div key={member.id}>{member.full_name}</div>
    </div>
  );
};

export default MemberList;
