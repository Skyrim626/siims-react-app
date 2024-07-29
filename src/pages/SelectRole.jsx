import React from "react";

export default function SelectRole() {
  const roles = [
    { id: 1, name: "admin" },
    { id: 2, name: "company" },
    { id: 3, name: "supervisor" },
    { id: 4, name: "chairperson" },
    { id: 5, name: "dean" },
    { id: 6, name: "student" },
  ];

  return (
    <>
      <h1>Select Role</h1>
      {roles.map((role) => {
        return (
          <div key={role.id}>
            <button className="bg-red-300 mt-3">{role.name}</button>
          </div>
        );
      })}
    </>
  );
}
