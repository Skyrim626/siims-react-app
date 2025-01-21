import { Button } from "@headlessui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ApplicationContent = ({ applications = [], applicationLocation }) => {
  // Open navigate
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {applications && applications.length > 0 ? (
        <>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Applications</h2>

          <table className="table-fixed w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="border border-gray-200 px-4 py-2">ID</th>
                <th className="border border-gray-200 px-4 py-2">Job</th>
                <th className="border border-gray-200 px-4 py-2">Company</th>
                <th className="border border-gray-200 px-4 py-2">Office</th>
                <th className="border border-gray-200 px-4 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="odd:bg-white even:bg-gray-50"
                >
                  <td className="border border-gray-200 px-4 py-2">
                    {application.id}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {application.work_post.title}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {application.work_post.office.company.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {application.work_post.office.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <Button
                      onClick={() =>
                        navigate(
                          `${applicationLocation}/applications/${application.id}`
                        )
                      }
                      className="text-blue-600 hover:underline"
                    >
                      View Application
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className="w-full h-56 flex justify-center items-center">
            <p className="font-bold text-2xl text-gray-500">
              No Applications found
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationContent;
