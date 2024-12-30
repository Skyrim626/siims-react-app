import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import FormModal from "../../components/modals/FormModal";
import UploadFile from "../../components/common/UploadFile.";
import { postFormDataRequest } from "../../api/apiHelpers";
import Loader from "../../components/common/Loader";

const StudentViewEditPersonalInsight = () => {
  // Params
  const { application_id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  // Check if formData exists in location.state
  const { formData: receivedFormData } = location.state || {};

  const [loading, setLoading] = useState(false);

  // Initialize state, check if receivedFormData exists, otherwise set to empty.
  const initialData = receivedFormData || {
    firstName: "",
    middleName: "",
    lastName: "",
    companyName: "",
    department: "IT",
    personalInsights: "",
    attachments: [],
  };

  const [savedData, setSavedData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...savedData });
  const [error, setError] = useState("");
  // File Name
  const [fileName, setFileName] = useState("insights.pdf");
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Select State
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Update formData when receivedFormData changes
    if (receivedFormData) {
      setFormData({ ...receivedFormData });
      setSavedData({ ...receivedFormData });
    }
  }, [receivedFormData]);

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

    setFormData({
      ...formData,
      attachments: [
        ...formData.attachments,
        ...validFiles.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        })),
      ],
    });
  };

  const removeFile = (index) => {
    const updatedAttachments = formData.attachments.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, attachments: updatedAttachments });
  };

  const handleSave = () => {
    setSavedData(formData);
    setIsEditing(false);
    alert("Changes saved successfully!");
    navigate(`/auth/my/${application_id}/view-insights`);
  };

  // Handle Open Modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null); // Clear selected file when closing modal
    setIsModalOpen(false);
  };

  // Handle file selection
  const handleFileInsightChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleSubmitFile = async () => {
    if (!selectedFile) {
      showFailedAlert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("insight_report", selectedFile);

      // Example API endpoint
      const response = await postFormDataRequest({
        url: `/api/v1/reports/${application_id}/personal-insight/submit`,
        data: formData,
      });

      if (response) {
        // alert("File uploaded successfully!"); // Replace with your preferred notification
        closeModal();
      }
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
      navigate(-1, {
        replace: true,
      });
    }
  };

  const exportToPDF = () => {
    if (!savedData || !savedData.attachments) {
      console.error("No data or attachments found!");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");

    // Logo paths
    const leftLogo = "/src/assets/images/logo/USTP-Logo-against-Light.png";
    const centerLogo = "/src/assets/images/logo/IT-Logo.png";
    const rightLogo = "/src/assets/images/logo/CITC_LOGO.png";

    // Adjust logo sizes
    const leftCenterLogoWidth = 20; // Width for left and center logos
    const logoHeight = 20; // Height for all logos
    const rightLogoWidth = 35; // Width for the third logo (right logo)
    const pageWidth = 210; // A4 width in mm

    // Reduced space between logos (e.g., 10mm)
    const logoSpacing = 10; // Space between logos

    // Calculate positions for logos to center them horizontally with reduced spacing
    const logosTotalWidth =
      leftCenterLogoWidth * 2 + rightLogoWidth + logoSpacing * 2; // Left + Center + Right with spacing
    const startX = (pageWidth - logosTotalWidth) / 2;

    // Add logos with updated size and reduced spacing
    doc.addImage(leftLogo, "PNG", startX, 10, leftCenterLogoWidth, logoHeight); // Left logo
    doc.addImage(
      centerLogo,
      "PNG",
      startX + leftCenterLogoWidth + logoSpacing,
      10,
      leftCenterLogoWidth,
      logoHeight
    ); // Center logo
    doc.addImage(
      rightLogo,
      "PNG",
      startX + (leftCenterLogoWidth + logoSpacing) * 2,
      10,
      rightLogoWidth,
      logoHeight
    ); // Right logo with adjusted width

    // Add university name below logos
    const universityName =
      "UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES";
    const campuses =
      "Alubijid | Cagayan de Oro | Claveria | Villanueva | Balubal | Jasaan | Oroquieta | Panaon";
    const textY = 10 + logoHeight + 5; // Reduced space between logos and university name

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(universityName, pageWidth / 2, textY, { align: "center" });

    // Adjusted the Y position for campuses text to be closer
    doc.text(campuses, pageWidth / 2, textY + 4, { align: "center" });

    // Add saved data content below the university name
    let yPosition = textY + 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `Name: ${savedData.firstName} ${savedData.middleName} ${savedData.lastName}`,
      10,
      yPosition
    );
    yPosition += 8;
    doc.text(`Company Name: ${savedData.companyName}`, 10, yPosition);
    yPosition += 8;
    doc.text(`Department: ${savedData.department}`, 10, yPosition);
    yPosition += 10;

    doc.text("Personal Insights:", 10, yPosition);
    yPosition += 8;
    const insightsText = doc.splitTextToSize(savedData.personalInsights, 180);
    doc.text(insightsText, 10, yPosition);
    yPosition += insightsText.length * 8;

    // Add attachments if any
    if (savedData.attachments.length > 0) {
      yPosition += 10;
      doc.text("Attachments:", 10, yPosition);
      yPosition += 8;

      let currentX = 10; // Starting X position for the first attachment
      const maxRowWidth = pageWidth - 20; // Maximum width available for attachments
      const attachmentWidth = 70; // Width of each attachment
      const attachmentHeight = 70; // Height of each attachment
      const attachmentSpacing = 10; // Space between attachments

      savedData.attachments.forEach((file, index) => {
        const imageUrl = file.url;
        const imageType = file.name.toLowerCase().includes(".png")
          ? "PNG"
          : file.name.toLowerCase().includes(".jpg") ||
            file.name.toLowerCase().includes(".jpeg")
          ? "JPEG"
          : null;

        if (imageType && imageUrl) {
          // Check if the current attachment can fit on the same row
          if (currentX + attachmentWidth > maxRowWidth) {
            // If not, move to the next line
            yPosition += attachmentHeight + attachmentSpacing;
            currentX = 10; // Reset to the start of the line
          }

          // Add the image to the PDF
          doc.addImage(
            imageUrl,
            imageType,
            currentX,
            yPosition,
            attachmentWidth,
            attachmentHeight
          );

          // Update current X for the next attachment
          currentX += attachmentWidth + attachmentSpacing;
        }
      });
    }

    // Save the PDF
    doc.save("Personal_Insights.pdf");
  };

  return (
    <div>
      <Loader loading={loading} />

      <div className="max-w-4xl mx-auto p-5 bg-white border rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isEditing ? "Edit Personal Insights" : "View Personal Insights"}
        </h1>

        {isEditing ? (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-lg"
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-lg"
                >
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-700">
                Personal Insights
              </label>
              <textarea
                name="personalInsights"
                value={formData.personalInsights}
                onChange={handleInputChange}
                rows="6"
                className="mt-2 w-full border border-gray-300 rounded-lg p-4 text-lg"
              ></textarea>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-700">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mt-2">
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
              {error && <p className="text-red-500 text-lg mt-2">{error}</p>}
              <ul className="mt-4 space-y-2">
                {formData.attachments.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                  >
                    <span className="text-lg">{file.name}</span>
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
            </div>

            <div className="flex justify-end space-x-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg text-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <p className="text-xl">
              <strong>Name:</strong>{" "}
              {`${savedData.firstName} ${savedData.middleName} ${savedData.lastName}`}
            </p>
            <p className="text-xl">
              <strong>Company Name:</strong> {savedData.companyName}
            </p>
            <p className="text-xl">
              <strong>Department:</strong> {savedData.department}
            </p>
            <p className="text-xl">
              <strong>Personal Insights:</strong> {savedData.personalInsights}
            </p>

            <div>
              <strong>Attachments:</strong>
              <ul className="mt-4 space-y-2">
                {savedData.attachments.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                  >
                    <span className="text-lg">{file.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end space-x-6">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg text-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={exportToPDF}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
              >
                Export to PDF
              </button>
              <button
                type="button"
                onClick={handleOpenModal}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
              >
                Submit Insights
              </button>
            </div>
          </div>
        )}

        {/* Modal for File Upload */}
        <FormModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          modalTitle="Upload Insights Report"
          onSubmit={handleSubmitFile}
        >
          <UploadFile
            title="Upload Insights Report"
            file={selectedFile}
            set={setSelectedFile}
            handleFileChange={handleFileInsightChange}
          />
        </FormModal>
      </div>
    </div>
  );
};

export default StudentViewEditPersonalInsight;
