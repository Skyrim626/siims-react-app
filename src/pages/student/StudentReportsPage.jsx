import { Button } from "@headlessui/react";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import toFilePath from "../../utils/baseURL";

const StudentReportsPage = () => {
  // Fetch Data
  const { initial_documents } = useLoaderData();

  // Open Navigate
  const navigate = useNavigate();

  // Container State
  const [documents, setDocuments] = useState(initial_documents);

  return (
    <div>
      {documents.length > 0 ? (
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-900 text-white py-4 shadow-md">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">Reports Dashboard</h1>
              <p className="text-sm mt-1">
                View your submitted reports and documents here.
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">
            {/* Submitted Documents Section */}
            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
              <ul className="space-y-2">
                {documents.map((document) => {
                  return (
                    <li>
                      <a
                        href={`${toFilePath(document.file_path)}`}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                      >
                        {document.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          </main>
        </div>
      ) : (
        <EmptyState
          title="No documents available at the moment"
          message="Once activities are recorded, documents will appear here."
        />
      )}
    </div>
  );
};

export default StudentReportsPage;
