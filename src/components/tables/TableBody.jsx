import { Button, Input } from "@headlessui/react";
import React from "react";
import { FaArchive, FaEdit, FaEye } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const TableBody = ({
  IDsIsLink = true,
  paginatedData,
  selectedIds,
  handleCheckboxChange,
  visibleColumns,
  handleView,
  handleEdit,
  handleDelete,
  handleArchive,
}) => {
  // Open Location
  const location = useLocation();

  return (
    <>
      <tbody>
        {paginatedData.map((data, index) => (
          <tr key={data.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="py-2 px-4 border-b">{index + 1}</td>
            <td className="py-2 px-4 border-b">
              <Input
                type="checkbox"
                checked={selectedIds.has(data.id)}
                onChange={() => handleCheckboxChange(data.id)}
                className="form-checkbox"
              />
            </td>
            <td
              className={`py-2 px-4 border-b text-blue-600 font-bold ${
                IDsIsLink && "cursor-pointer hover:underline"
              } `}
            >
              {IDsIsLink ? (
                <Link to={`${location.pathname}/${data.id}`}>{data.id}</Link>
              ) : (
                data.id
              )}
            </td>
            {visibleColumns.map((column) => (
              <td key={column} className="py-2 px-4 border-b text-blue-700">
                {Array.isArray(data[column])
                  ? data[column].map((role, index) => (
                      <p key={index} className="font-bold">
                        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                      </p>
                    ))
                  : data[column]}
              </td>
            ))}

            {(handleEdit || handleDelete || handleView || handleArchive) && (
              <td className="py-2 px-4 border-b">
                <div className="flex justify-center gap-2">
                  {handleView && (
                    <Button
                      onClick={() => handleView(data.id)}
                      className="text-blue-600 hover:underline"
                    >
                      <FaEye size={18} />
                    </Button>
                  )}

                  {handleEdit && (
                    <Button
                      onClick={() => handleEdit(data)}
                      className="text-yellow-600 hover:underline"
                    >
                      <FaEdit size={18} />
                    </Button>
                  )}

                  {handleArchive && (
                    <Button
                      onClick={() => handleArchive(data.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaArchive size={18} />
                    </Button>
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
