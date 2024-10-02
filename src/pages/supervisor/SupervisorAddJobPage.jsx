import React, { useEffect, useState } from "react";
import Section from "../../components/common/Section";
import { Link, useLocation } from "react-router-dom";
import Page from "../../components/common/Page";
import { ChevronLeft } from "lucide-react";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import WorkPostForm from "../../components/forms/WorkPostForm";
import { stripLocation } from "../../utils/strip";
import ContentLoader from "../../components/atoms/ContentLoader";
import { getRequest } from "../../api/apiHelpers";
import useForm from "../../hooks/useForm";
import useHandleSubmit from "../../hooks/useHandleSubmit";

const SupervisorAddJobPage = () => {
  // Open Location
  const location = useLocation();
  const strippedPath = stripLocation(location.pathname, "/add");

  // State to store the list of work types
  const [workTypes, setWorkTypes] = useState([]);

  // Custom hook for handling submit
  const { error, handleSubmit } = useHandleSubmit();

  // Form State
  // Using the custom hook for Work Post Information
  const [workPostInfo, handleWorkPostInfoChange, resetWorkPostInfo] = useForm({
    work_type_id: "",
    title: "",
    responsibilities: "",
    qualifications: "",
    date_start: "",
    max_applicants: "",
    date_end: "",
    work_duration: "",
  });

  // useEffect hook to fetch work types from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Perform GET request to retrieve work types
      const workTypesResponse = await getRequest({
        url: "/api/v1/supervisor/work-types", // API endpoint for fetching work types
      });

      // Update the state with the fetched dean data
      setWorkTypes(workTypesResponse); // Setting the fetched dean data in state
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Handle Submit
  const handleSubmitForm = () => {
    // Payload
    const payload = workPostInfo;

    // Submit Form
    handleSubmit({
      method: "post",
      url: "/api/v1/supervisor/work-posts",
      data: payload,
      resetField: () => resetWorkPostInfo(),
    });
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
          <Heading level={3} text={"Add Job"} />
          <Text className="text-sm text-blue-950">
            This is where you add a job opportunity.
          </Text>
          <hr className="my-3" />
        </Section>

        {workTypes.length > 0 ? (
          <Section>
            <WorkPostForm
              isFormModal={false}
              workTypes={workTypes}
              workPostInfo={workPostInfo}
              handleWorkPostInfoChange={handleWorkPostInfoChange}
              handleSubmit={handleSubmitForm}
            />
          </Section>
        ) : (
          <Text>Loading...</Text>
        )}
      </Page>
    </>
  );
};

export default SupervisorAddJobPage;
