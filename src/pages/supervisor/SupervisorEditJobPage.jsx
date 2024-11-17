import React, { useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { stripLocation } from "../../utils/strip";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import { ChevronLeft } from "lucide-react";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import WorkPostForm from "../../components/forms/WorkPostForm";
import { putRequest } from "../../api/apiHelpers";

const SupervisorEditJobPage = () => {
  // Retrieve the work post data from the loader
  const workPost = useLoaderData();
  // console.log(workPost);

  // Open Location
  const location = useLocation();
  const strippedPath = stripLocation(
    location.pathname,
    `/edit/${workPost["id"]}`
  );
  const navigate = useNavigate();

  const formatToMMDDYYYY = (dateString) => {
    const date = new Date(dateString); // Parse the date string
    if (isNaN(date)) return "Invalid Date"; // Handle invalid date

    // Extract month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    // Return formatted date
    return `${year}-${month}-${day}`;
  };

  // Input State
  const [workTypeId, setWorkTypeId] = useState(workPost["work_type_id"]);
  const [title, setTitle] = useState(workPost["title"]);
  const [responsibilities, setResponsibilities] = useState(
    workPost["responsibilities"]
  );
  const [qualifications, setQualifications] = useState(
    workPost["qualifications"]
  );
  const [startDate, setStartDate] = useState(
    formatToMMDDYYYY(workPost["start_date"])
  );
  const [maxApplicants, setMaxApplicants] = useState(
    workPost["max_applicants"]
  );
  const [endDate, setEndDate] = useState(
    formatToMMDDYYYY(workPost["end_date"])
  );
  const [workDuration, setWorkDuration] = useState(workPost["work_duration"]);
  const [errors, setErrors] = useState({});

  // Update a job
  const updateWorkPost = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const payload = {
        work_type_id: workTypeId,
        title: title,
        responsibilities: responsibilities,
        qualifications: qualifications,
        date_start: startDate,
        date_end: endDate,
        work_duration: workDuration,
        max_applicants: maxApplicants,
      };

      // console.log(payload);

      // Make PUT Request
      const response = await putRequest({
        url: `/api/v1/supervisor/work-posts/${workPost["id"]}`,
        data: payload,
      });

      // Redirect after success
      if (response) {
        navigate(strippedPath); // Redirect to strippedPath
      }
    } catch (error) {
      // Handle and set errors
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors); // Assuming validation errors are in `errors`
      } else {
        console.error("An unexpected error occurred:", error);
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <Page>
        <Section>
          <Link
            to={strippedPath}
            className="flex items-center text-sm font-bold text-blue-500 hover:underline"
          >
            <ChevronLeft size={20} />
            Go Back
          </Link>
        </Section>

        <Section>
          <Heading level={3} text={"Edit Job"} />
          <Text className="text-sm text-blue-950">
            This is where you edit a job opportunity.
          </Text>
          <hr className="my-3" />
        </Section>

        <Section>
          <WorkPostForm
            requestMethod="put"
            workTypeId={workTypeId}
            title={title}
            responsibilities={responsibilities}
            qualifications={qualifications}
            startDate={startDate}
            endDate={endDate}
            maxApplicants={maxApplicants}
            workDuration={workDuration}
            setWorkTypeId={setWorkTypeId}
            setTitle={setTitle}
            setResponsibilities={setResponsibilities}
            setQualifications={setQualifications}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setMaxApplicants={setMaxApplicants}
            setWorkDuration={setWorkDuration}
            isFormModal={false}
            // workTypes={workTypes}
            handleSubmit={updateWorkPost}
          />
        </Section>
      </Page>
    </>
  );
};

export default SupervisorEditJobPage;
