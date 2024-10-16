import React, { useEffect, useState } from "react";
import { useParams, NavLink, useLocation } from "react-router-dom";
import Page from "../../components/common/Page";
import { Button, Textarea } from "@headlessui/react";
import { getRequest } from "../../api/apiHelpers";
import Text from "../../components/common/Text";

const StudentApplyJobPage = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const location = useLocation();

  console.log(location);
  console.log(job);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true);
      const response = await getRequest({
        url: `/api/v1/student/jobs/${job_id}`,
      });
      setJob(response);
      setIsLoading(false);
    };

    fetchJobDetails();
  }, [job_id]);

  const handleApply = async (e) => {
    e.preventDefault();
    // Handle the job application logic here
    console.log("Applying for job:", job_id);
    console.log("Cover Letter:", coverLetter);
    console.log("Files:", files);
    // You can also send a request to submit the application
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  if (isLoading) {
    return (
      <Page>
        <Text>Loading job details...</Text>
      </Page>
    );
  }

  if (!job) {
    return (
      <Page>
        <Text>Job not found.</Text>
      </Page>
    );
  }

  return (
    <Page>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Apply for {job.title}
        </h1>
        <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-700">{job.title}</h2>
          <p className="text-gray-600">{job.company_name}</p>
          <p className="text-gray-500 mt-2">{job.responsibilities}</p>
          <p className="text-gray-500">Qualifications: {job.qualifications}</p>
          <p className="text-gray-500">
            Duration: {job.work_duration} | Start Date:{" "}
            {new Date(job.start_date).toLocaleDateString()} | End Date:{" "}
            {new Date(job.end_date).toLocaleDateString()}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Application Form</h2>
        <form onSubmit={handleApply} className="space-y-6">
          <Textarea
            label="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write your cover letter here..."
            required
            rows={6}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="border-dashed border-2 border-blue-500 p-4 rounded-lg text-center mb-4 cursor-pointer"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <p className="text-gray-500">
              Drop your files here or click to upload
            </p>
            <input
              type="file"
              multiple
              id="fileInput"
              onChange={(e) =>
                setFiles([...files, ...Array.from(e.target.files)])
              }
              className="hidden"
              onClick={(e) => {
                e.target.value = null; // To allow re-uploading the same file
              }}
            />
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span className="text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleFileRemove(file)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Submit Application
          </Button>
        </form>

        <div className="mt-6 text-center">
          <NavLink
            to={`${location.pathname}/request-endorsement`} // Link to the endorsement letter request page
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Request Endorsement Letter
          </NavLink>
        </div>
      </div>
    </Page>
  );
};

export default StudentApplyJobPage;
