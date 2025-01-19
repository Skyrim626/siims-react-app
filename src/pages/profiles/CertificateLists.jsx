import React, { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { getRequest, postRequest, deleteRequest } from "../../api/apiHelpers";
import { formatDateOnly } from "../../utils/formatDate";

const CertificateLists = () => {
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);

  const [newCertificate, setNewCertificate] = useState({
    name: "",
    file: null,
    issued_date: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Profile Data
  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const response = await getRequest({ url: "/api/v1/profiles/student" });
      if (response) {
        setCertificates(response.certificates);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewCertificate((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmitCertificate = async () => {
    if (
      !newCertificate.name ||
      !newCertificate.issued_date ||
      !newCertificate.file
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append("name", newCertificate.name);
    formData.append("issued_date", newCertificate.issued_date);
    formData.append("file", newCertificate.file);

    try {
      setLoading(true);
      const response = await postRequest({
        url: "/api/v1/certificates",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        alert("Certificate added successfully!");
        toggleModal();
        fetchCertificates(); // Refresh the certificates list
      }
    } catch (error) {
      console.error("Failed to add certificate:", error);
      alert("An error occurred while adding the certificate.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCertificate = async (certificateId) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await deleteRequest({
        url: `/api/v1/certificates/${certificateId}`,
      });

      if (response) {
        alert("Certificate deleted successfully!");

        setCertificates((prev) =>
          prev.filter((certificate) => certificate.id !== certificateId)
        );
      }

      fetchCertificates(); // Refresh the certificates list
    } catch (error) {
      console.error("Failed to delete certificate:", error);
      alert("An error occurred while deleting the certificate.");
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Check Loading
  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-indigo-900">
          Certificates
        </h3>
        <button
          className="px-4 py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={toggleModal}
        >
          Add New Certificate
        </button>

        <section>
          <ul className="space-y-4">
            {certificates.length > 0 &&
              certificates.map((certificate) => (
                <li
                  key={certificate.id}
                  className="p-4 border rounded-lg shadow-sm bg-indigo-50"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center">
                    <a
                      href={certificate.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline text-blue-500 font-semibold"
                    >
                      {certificate.name}
                    </a>

                    <div className="text-sm text-gray-600 font-semibold">
                      Issued date: {formatDateOnly(certificate.issued_date)}
                    </div>

                    <button
                      onClick={() => handleDeleteCertificate(certificate.id)}
                      className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Certificate</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Certificate Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCertificate.name}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Issued Date
                </label>
                <input
                  type="date"
                  name="issued_date"
                  value={newCertificate.issued_date}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload File (PDF Only)
                </label>
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleSubmitCertificate}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateLists;
