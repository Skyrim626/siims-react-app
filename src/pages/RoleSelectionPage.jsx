import React from "react";

export default function RoleSelectionPage() {
  const roles = [
    "admin",
    "company",
    "supervisor",
    "department chairperson",
    "dean",
    "student",
  ];

  return (
    <>
      <h1>Select Role</h1>
      {roles.map((role) => {
        return (
          <div>
            <button className="bg-red-300 mt-3">{role}</button>
          </div>
        );
      })}
    </>
  );
}
