import React, { useState } from "react";
import { FaArchive, FaEdit, FaEye } from "react-icons/fa";

const TableBody = ({
  paginatedData,
  selectedIds,
  handleCheckboxChange,
  visibleColumns,
  handleView,
  handleEdit,
  handleArchive,
}) => {
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
            <td className="py-2 px-4 border-b text-blue-600 font-bold cursor-pointer hover:underline">
              {data.id}
            </td>
            {visibleColumns.map((column) => (
              <td key={column} className="py-2 px-4 border-b">
                {data[column]}
              </td>
            ))}
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
                    onClick={() => handleEdit(data.id)}
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
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableBody;
