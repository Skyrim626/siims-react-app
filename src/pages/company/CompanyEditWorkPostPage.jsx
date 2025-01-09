import React, { useEffect, useState } from "react";
import Section from "../../components/common/Section";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Page from "../../components/common/Page";
import { ChevronLeft } from "lucide-react";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import WorkPostForm from "../../components/forms/WorkPostForm";
import { stripLocation } from "../../utils/strip";
import ContentLoader from "../../components/atoms/ContentLoader";
import { getRequest, postRequest, putRequest } from "../../api/apiHelpers";
import { Button } from "@headlessui/react";
import Loader from "../../components/common/Loader";

const CompanyEditWorkPostPage = () => {
  // Fetch offices and work_types
  const { work_post, work_types } = useLoaderData();

  // console.log(work_post);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Open Location and navigate
  const location = useLocation();
  const strippedPath = stripLocation(location.pathname, "/edit/2");
  const navigate = useNavigate();

  // Input State
  const [workTypeId, setWorkTypeId] = useState(work_post["work_type_id"]);
  const [title, setTitle] = useState(work_post["title"]);
  const [responsibilities, setResponsibilities] = useState(
    work_post["responsibilities"]
  );
  const [qualifications, setQualifications] = useState(
    work_post["qualifications"]
  );
  const [startDate, setStartDate] = useState(work_post["start_date"]);
  const [maxApplicants, setMaxApplicants] = useState(
    work_post["max_applicants"]
  );
  const [endDate, setEndDate] = useState(work_post["end_date"]);
  const [workDuration, setWorkDuration] = useState(work_post["work_duration"]);
  const [errors, setErrors] = useState({});
  // Update work post
  const updateWorkPost = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Set Loading
    setLoading(true);

    try {
      const payload = {
        work_type_id: workTypeId,
        title: title,
        responsibilities: responsibilities,
        qualifications: qualifications,
        start_date: startDate,
        end_date: endDate,
        work_duration: workDuration,
        max_applicants: maxApplicants,
      };

      // console.log(payload);

      // Make POST Request
      const response = await putRequest({
        url: `/api/v1/company/work-posts/${work_post["id"]}`,
        data: payload,
      });

      // console.log(response);

      if (response) {
        navigate(-1);
      }

      // navigate(strippedPath);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Page>
        <Loader loading={loading} />

        <Section>
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-bold text-blue-500 hover:underline"
          >
            <ChevronLeft size={20} />
            Go Back
          </Button>
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
            workTypes={work_types}
            handleSubmit={updateWorkPost}
          />
        </Section>
      </Page>
    </>
  );
};

export default CompanyEditWorkPostPage;
