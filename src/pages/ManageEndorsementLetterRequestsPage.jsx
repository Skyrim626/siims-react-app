import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../components/common/Page";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import Loader from "../components/common/Loader";
import {
  getEndorsementRequestsActionColumns,
  getEndorsementRequestsStaticColumns,
} from "../utils/columns";
import { Tab, TabGroup, TabList } from "@headlessui/react";

// Tab Links
const tabLinks = [
  {
    name: "All",
    url: "/endorsement-letter-requests",
  },
  {
    name: "Pending",
    url: "/endorsement-letter-requests/pending",
  },
  {
    name: "Pending Approval",
    url: "/endorsement-letter-requests/pending-approval",
  },
  {
    name: "Approved",
    url: "/endorsement-letter-requests/approved",
  },
  /* {
    name: "Withdrawn",
    url: "/endorsement-letter-requests/withdrawn",
  }, */
];

const ManageEndorsementLetterRequestsPage = ({ authorizeRole }) => {
  // Open location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Loading state
  const [loading, setLoading] = useState(false);
  // Row State
  const [rows, setRows] = useState([]);
  // Select State
  const [activeTab, setActiveTab] = useState(tabLinks[0]);

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getEndorsementRequestsStaticColumns({
        pathname: location.pathname,
        activeTab: activeTab,
      }),
    [authorizeRole, activeTab]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getEndorsementRequestsActionColumns({
        pathname: location.pathname,
        studentPathname: `/auth/${authorizeRole}/students`,
        activeTab: activeTab,
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
        <Heading level={3} text={"Endorsement Letter Requests"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the endorsement letter requests.
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
          />
        </TabGroup>
      </div>
    </Page>
  );
};

export default ManageEndorsementLetterRequestsPage;
