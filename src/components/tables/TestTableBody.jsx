import { Button, Input } from "@headlessui/react";
import React from "react";
import { FaArchive, FaEdit, FaEye } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import toFilePath from "../../utils/baseURL";
import Text from "../common/Text";
import { getStatusBgColor, getStatusColor } from "../../utils/statusColor";

const TestTableBody = ({
  paginatedData,
  selectedIds,
  handleCheckboxChange,
  visibleColumns,
  includeCheckboxes,
  handleView,
  handleEdit,
  handleDelete,
  handleArchive,
  openModal,
}) => {
  // const location = useLocation();

  // console.log(paginatedData);

  // console.log(paginatedData);

  return (
    <>
      <tbody>
        {paginatedData.map((data, index) => (
          <tr key={data.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="py-2 px-4 border-b">{index + 1}</td>
            {includeCheckboxes && (
              <td className="py-2 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectedIds.has(data.id)}
                  onChange={() => handleCheckboxChange(data.id)}
                  className="form-checkbox"
                />
              </td>
            )}

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
              // console.log(data[column]);
              // console.log(column);
              if (column === "roles") {
                // console.log(column);
                // console.log(data[column]);

                return (
                  <td
                    key={column}
                    className="py-2 px-4 border-b text-blue-700 font-bold"
                  >
                    {data[column].map((role, index) => {
                      // console.log(role.name);

                      return <p key={index}>{role.name}</p>;
                    })}
                    {/* Join the names with a comma */}
                  </td>
                );
              } else if (column === "update_endorsement") {
                // console.log(openModal);
                // console.log(data[column]);
                // console.log(data);
                return (
                  <td key={column} className="text-center">
                    <Button
                      onClick={(e) => openModal(data)}
                      className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
                    >
                      Change File
                    </Button>
                  </td>
                );
              } else if (column === "file_path") {
                return (
                  <td
                    key={column}
                    className="py-2 px-4 border-b text-blue-700 font-bold flex flex-col gap-3 text-wrap"
                  >
                    <a
                      href={`${toFilePath(data[column])}`}
                      className="hover-underline"
                      target="_blank"
                    >
                      {data[column]}
                    </a>
                  </td>
                );
              } else if (column === "documents" && data[column]) {
                return (
                  <td
                    key={column}
                    className="py-2 px-4 border-b text-blue-700 font-bold flex flex-col gap-3"
                  >
                    {data[column]
                      ? data[column].map((document, index) => {
                          // console.log(document);

                          if (document["file_path"]) {
                            return (
                              <Text key={index}>
                                <a
                                  href={`${toFilePath(document["file_path"])}`}
                                  className="underline text-"
                                  target="_blank"
                                >
                                  {document.file_type}
                                </a>
                                <br />
                              </Text>
                            );
                          }
                        })
                      : ""}
                  </td>
                );
              } else if (column === "status") {
                return (
                  <td key={column} className="py-2 px-4 border-b font-bold">
                    <Text
                      className={`${getStatusBgColor(
                        data[column]
                      )} rounded-full ${getStatusColor(
                        data[column]
                      )} py-3 px-6`}
                    >
                      {data[column]}
                    </Text>
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

export default TestTableBody;
