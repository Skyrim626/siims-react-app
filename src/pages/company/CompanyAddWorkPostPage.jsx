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
import { postRequest } from "../../api/apiHelpers";
import Loader from "../../components/common/Loader";

const CompanyAddWorkPostPage = () => {
  // Fetch offices and work_types
  const { offices, work_types } = useLoaderData();

  // Open Location
  const location = useLocation();
  const strippedPath = stripLocation(location.pathname, "/add");
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Input State
  const [officeId, setOfficeId] = useState(null);
  const [workTypeId, setWorkTypeId] = useState(null);
  const [title, setTitle] = useState("Intern");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [startDate, setStartDate] = useState("");
  const [maxApplicants, setMaxApplicants] = useState(1);
  const [endDate, setEndDate] = useState("");
  const [workDuration, setWorkDuration] = useState("");
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSkillChange = (e) => {
    const value = e.target.value;
    if (!skills.includes(value) && value) {
      setSkills([...skills, value]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Add work post
  const addWorkPost = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Set Loading State
    setLoading(true);

    try {
      const payload = {
        office_id: officeId,
        work_type_id: workTypeId,
        title: title,
        responsibilities: responsibilities,
        qualifications: qualifications,
        start_date: startDate,
        end_date: endDate,
        work_duration: workDuration,
        max_applicants: maxApplicants,
        skills: skills, // Include the selected skill
      };

      // console.log(payload);

      // Make POST Request
      const response = await postRequest({
        url: "/api/v1/company/work-posts",
        data: payload,
      });

      // Redirect after success
      if (response) {
        setLoading(false);
        navigate(-1); // Redirect to strippedPath
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Page>
        <Loader loading={loading} />

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
          <Heading level={3} text={"Add Job"} />
          <Text className="text-sm text-blue-950">
            This is where you add a job opportunity.
          </Text>
          <hr className="my-3" />
        </Section>

        <Section>
          <WorkPostForm
            officeId={officeId}
            workTypeId={workTypeId}
            title={title}
            responsibilities={responsibilities}
            qualifications={qualifications}
            startDate={startDate}
            endDate={endDate}
            maxApplicants={maxApplicants}
            workDuration={workDuration}
            skills={skills}
            setSkills={setSkills}
            setOfficeId={setOfficeId}
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
            offices={offices}
            handleSubmit={addWorkPost}
            handleRemoveSkill={handleRemoveSkill}
            handleSkillChange={handleSkillChange}
            displayFields={{
              officeId: true,
              workTypeId: true,
              title: true,
              responsibilities: true,
              qualifications: true,
              startDate: true,
              endDate: true,
              workDuration: true,
              maxApplicants: true,
              skills: true,
            }}
          />
        </Section>
      </Page>
    </>
  );
};

export default CompanyAddWorkPostPage;
