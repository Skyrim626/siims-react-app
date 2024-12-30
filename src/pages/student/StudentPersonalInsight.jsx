import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentPersonalInsight = ({ authorizeRole }) => {
  // Params
  const { application_id } = useParams();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    companyName: "",
    department: "",
    personalInsights: "",
    attachments: [], // For multiple file uploads
    application_id: application_id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Check for valid file types (PNG and JPG)
    const validFiles = files.filter(
      (file) => file.type === "image/png" || file.type === "image/jpeg"
    );

    if (validFiles.length !== files.length) {
      setError("Only PNG and JPG files are allowed.");
      setTimeout(() => setError(""), 3000);
    }
    // Add valid files to the existing attachment list
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...validFiles],
    });
  };

  const removeFile = (index) => {
    const updatedAttachments = formData.attachments.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, attachments: updatedAttachments });
  };

  const notifyCoordinator = async () => {
    // Simulate sending a notification to the coordinator
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Notification sent to coordinator.");
        resolve("Success");
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate saving the form data
    console.log("Form data being saved:", formData);

    // Notify the coordinator
    try {
      const notificationResponse = await notifyCoordinator();
      console.log(notificationResponse);
      // alert("Details saved and the coordinator has been notified.");
      navigate(`/auth/my/${application_id}/view-insights`, {
        state: { formData },
      });
    } catch (error) {
      console.error("Error notifying coordinator:", error);
      // alert("An error occurred while notifying the coordinator.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-md shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Personal Insights
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Personal Details */}
          <div>
            <label className="block text-gray-700 font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              placeholder="Enter your middle name"
              value={formData.middleName}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Enter the company name"
              value={formData.companyName}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select your department
              </option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Personal Insights <span className="text-red-500">*</span>
          </label>
          <textarea
            name="personalInsights"
            placeholder="Share your internship experience and insights here..."
            value={formData.personalInsights}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">
            Attachments <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
            <input
              type="file"
              name="attachments"
              accept="image/png,  image/jpeg"
              onChange={handleFileChange}
              multiple
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Drag and drop files here or choose files
            </label>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="text-gray-500 text-sm mt-2">
            Supported file type: PNG, JPG | Max size: 125 MB
          </p>

          {/* Uploaded Files */}
          {formData.attachments.length > 0 && (
            <ul className="mt-4 space-y-2">
              {formData.attachments.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <span className="text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-white rounded-md ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentPersonalInsight;
