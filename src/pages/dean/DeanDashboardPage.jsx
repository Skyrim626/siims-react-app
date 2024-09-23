import React, { useEffect, useState } from "react";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { getRequest } from "../../api/apiHelpers";

const DeanDashboardPage = () => {
  const [dashboard, setDashboard] = useState([]);

  // Get Dashboard Info
  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await getRequest({
        url: "/api/v1/dean/dashboard",
      });

      console.log(response);
      // Set
      setDashboard(response);
    };

    // Call
    fetchDashboard();
  }, []);

  return (
    <>
      {dashboard && (
        <Page>
          <Section>
            <Heading level={3} text={"Dashboard"} />
            <Text className="text-sm text-blue-950">
              Overview of the system data.
            </Text>
            <hr className="my-3" />
          </Section>
          <Section className="my-3 flex items-end">
            <div className="rounded-lg py-4 w-full">
              <Heading
                level={5}
                text={`${dashboard.college_name}`}
                className="font-bold text-black"
              />
              <Heading
                level={2}
                text={`Welcome back, Dean!`}
                className="font-bold text-black mt-2"
              />
              <Text>Take a look at the updated SIIMS overview</Text>
            </div>
          </Section>
        </Page>
      )}
    </>
  );
};

export default DeanDashboardPage;
