import React from "react";
import { Building, Search, UserPen } from "lucide-react";
import { Link } from "react-router-dom";

// Customize User Selection
const selection = [
  {
    icon: (
      <Search
        size={40}
        className="text-gray-500 group-hover:text-blue-500 transition"
      />
    ),
    path: "/chairperson/users/student",
    name: "Student",
  },
  {
    icon: (
      <UserPen
        size={40}
        className="text-gray-500 group-hover:text-blue-500 transition"
      />
    ),
    path: "/chairperson/users/coordinator",
    name: "Coordinator",
  },
  {
    icon: (
      <Building
        size={40}
        className="text-gray-500 group-hover:text-blue-500 transition"
      />
    ),
    path: "/chairperson/users/company",
    name: "Company",
  },
];

export default function ChairpersonUsers() {
  return (
    <div className="flex flex-col mt-10 justify-center">
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold">SELECT USER</h2>
      </div>
      <div className="mt-10 flex items-center justify-center">
        {selection.map((link, index) => (
          <Link
            to={link.path}
            key={index}
            className="flex flex-col items-center justify-center flex-1 group"
          >
            <div className="p-12 rounded-full border-2 transition border-gray-500 group-hover:border-blue-500 flex items-center justify-center">
              {link.icon}
            </div>
            <p className="font-bold text-xl mt-3 transition text-gray-500 group-hover:text-blue-500">
              {link.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
