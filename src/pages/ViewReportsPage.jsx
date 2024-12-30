import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getReportsActionColumns,
  getReportsStaticColumns,
} from "../utils/columns/reportsColumns";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";

const ViewReportsPage = ({ authorizeRole }) => {
  // Tab Links
  const tabLinks = [
    {
      name: "Active",
      url: `/reports/active`,
    },
    {
      name: "Completed",
      url: `/reports/completed`,
    },
  ];

  // Open location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState(false);
  // Row State
  const [rows, setRows] = useState([]);
  // Select State
  const [activeTab, setActiveTab] = useState(tabLinks[0]);

  // Function that navigates to DTR
  const navigateToDtr = ({ id }) => {
    const to = `${location.pathname}/${id}/daily-time-records`;

    navigate(to);
  };

  // Function that navigates to WAR
  const navigateToWar = (params) => {
    const to = `${location.pathname}/${params.row.id}/weekly-accomplishment-reports`;

    navigate(to, {
      state: {
        name: params.row.name,
      },
    });
  };

  // Function that navigates to Performance Evaluation
  const navigateToEvaluation = (params) => {
    const to = `${location.pathname}/${params.row.id}/performance-evaluation`;

    navigate(to);
  };

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getReportsStaticColumns({
        authorizeRole,
      }),
    [authorizeRole]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getReportsActionColumns({
        authorizeRole: authorizeRole,
        activeTab: activeTab,
        navigateToDtr: navigateToDtr,
        navigateToWar: navigateToWar,
        navigateToEvaluation: navigateToEvaluation,
      }),
    [authorizeRole, activeTab]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <Page>
      <Loader loading={loading} />

      <Section>
        <Heading level={3} text={"View Reports"} />
        <Text className="text-sm text-blue-950">
          This is where you view the student's reports.
        </Text>
        <hr className="my-3" />
      </Section>

      <div className="mt-3">
        <TabGroup>
          <TabList className="flex gap-4 mb-5">
            {tabLinks.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  className={`rounded-full py-1 px-3 text-sm/6 font-semibold focus:outline-none ${
                    activeTab.name === tab.name
                      ? "bg-blue-700 text-white" // Active tab style
                      : "bg-transparent text-blue-700" // Inactive tab style
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.name}
                </Tab>
              );
            })}
          </TabList>

          <DynamicDataGrid
            // searchPlaceholder="Search something"
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={activeTab.url}
            checkboxSelection={false}
            requestedBy={authorizeRole}
          />
        </TabGroup>
      </div>
    </Page>
  );
};

export default ViewReportsPage;
