import { Button } from "@headlessui/react";
import React from "react";
import { FaArchive, FaEdit, FaEye } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const TableBody = ({
  paginatedData,
  selectedIds,
  handleCheckboxChange,
  visibleColumns,
  handleView,
  handleEdit,
  handleDelete,
  handleArchive,
}) => {
  // const location = useLocation();

  // console.log(paginatedData);

  return (
    <>
      <tbody>
        {paginatedData.map((data, index) => (
          <tr key={data.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="py-2 px-4 border-b">{index + 1}</td>
            <td className="py-2 px-4 border-b">
              <input
                type="checkbox"
                checked={selectedIds.has(data.id)}
                onChange={() => handleCheckboxChange(data.id)}
                className="form-checkbox"
              />
            </td>
            <td className="py-2 px-4 border-b text-blue-600 font-bold">
              {handleView ? (
                <Button
                  className="hover:underline"
                  onClick={() => handleView(data.id)}
                >
                  {data.id}
                </Button>
              ) : (
                data.id
              )}
            </td>
            {visibleColumns.map((column) => {
              // console.log(column);

              if (column === "roles") {
                return (
                  <td
                    key={column}
                    className="py-2 px-4 border-b text-blue-700 font-bold"
                  >
                    {data[column]
                      .map((role) => role.name) // Extract the "name" of each role
                      .join(", ")}{" "}
                    {/* Join the names with a comma */}
                  </td>
                );
              } else if (column === "status") {
                return (
                  <td key={column} className="py-2 px-4 border-b font-bold">
                    <Button className="bg-green-500 p-2 rounded-full text-white">
                      {data[column]}
                    </Button>
                  </td>
                );
              } else {
                return (
                  <td
                    key={column}
                    className="py-2 px-4 border-b text-blue-700 font-bold"
                  >
                    {data[column]}
                  </td>
                );
              }
            })}

            {(handleEdit || handleDelete || handleView) && (
              <td className="py-2 px-4 border-b">
                <div className="flex justify-center gap-2">
                  {handleView && (
                    <button
                      onClick={() => handleView(data.id)}
                      className="text-blue-600 hover:underline"
                    >
                      <FaEye size={18} />
                    </button>
                  )}

                  {handleEdit && (
                    <button
                      onClick={() => handleEdit(data)}
                      className="text-yellow-600 hover:underline"
                    >
                      <FaEdit size={18} />
                    </button>
                  )}

                  {handleArchive && (
                    <button
                      onClick={() => handleArchive(data.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaArchive size={18} />
                    </button>
                  )}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
