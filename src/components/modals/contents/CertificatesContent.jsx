import React from "react";
import { formatDate, formatDateOnly } from "../../../utils/formatDate";

const CertificatesContent = ({ certificates = [] }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {certificates && certificates.length > 0 ? (
        <>
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            Certificate Section
          </h2>

          {/* Certificates Table */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              Certificates
            </h3>

            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="border border-gray-200 px-4 py-2">ID</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Certificate Type
                  </th>

                  <th className="border border-gray-200 px-4 py-2">
                    Submitted At
                  </th>
                  <th className="border border-gray-200 px-4 py-2">
                    Updated At
                  </th>
                </tr>
              </thead>

              <tbody>
                {certificates.map((certificate) => (
                  <tr
                    key={certificate.id}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {certificate.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <a
                        href={certificate.file_path}
                        target="_blank"
                        className="font-semibold underline text-blue-500 hover:text-blue-600"
                      >
                        {certificate.name}
                      </a>
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {certificate.issued_date}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {formatDateOnly(certificate.updated_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="w-full h-52 flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-500">
            No Certificates Yet
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificatesContent;
