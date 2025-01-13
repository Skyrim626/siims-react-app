import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/common/Page";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import {
  getApplicantsActionColumns,
  getApplicantsStaticColumns,
} from "../utils/columns/applicantsColumns";
import { Button, Tab, TabGroup, TabList } from "@headlessui/react";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import { useLocation } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { getRequest } from "../api/apiHelpers";
import StatusListModal from "../components/modals/StatusListModal";
import { getApplicationStatusColor } from "../utils/statusColor";

// Tab Links
const tabLinks = [
  {
    name: "All",
    url: "/applicants",
    authorizeRoles: ["company", "coordinator", "osa"],
  },
  {
    name: "Pending",
    url: "/applicants/pending",
    authorizeRoles: ["company", "coordinator"],
  },
  {
    name: "Approved",
    url: "/applicants/approved",
    authorizeRoles: ["company", "coordinator", "osa"],
  },
  {
    name: "Ready for Deployment",
    url: "/applicants/ready-for-deployment",
    authorizeRoles: ["osa"],
  },
  {
    name: "Withdrawn",
    url: "/applicants/withdrawn",
    authorizeRoles: ["osa", "coordinator", "company"],
  },
  {
    name: "Rejected",
    url: "/applicants/rejected",
    authorizeRoles: ["company"],
  },
  /* 
  {
    name: "Withdrawn",
    url: "/applicants/withdrawn",
  },
  {
    name: "Expired",
    url: "/applicants/expired",
  }, */
];

const ManageApplicantsPage = ({ authorizeRole }) => {
  // Open location
  const location = useLocation();

  // Loading State
  const [loading, setLoading] = useState(false);
  // Row State
  const [rows, setRows] = useState([]);
  // Select State
  const [activeTab, setActiveTab] = useState(tabLinks[0]);
  // Modal State
  const [isOpen, setIsOpen] = useState(false);
  // Container State
  const [statuses, setStatuses] = useState([]);

  // Function: Fetch all application statuses
  const fetchApplicationStatuses = async () => {
    // Set Loading State
    setLoading(true);

    try {
      const response = await getRequest({
        url: "/api/v1/statuses/application-status-lists",
      });

      if (response) {
        setStatuses(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationStatuses();
  }, []);

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getApplicantsStaticColumns({
        pathname: location.pathname,
        authorizeRole: authorizeRole,
        activeTab: activeTab,
      }),
    [authorizeRole, activeTab]
  );
  // Action Column
  const actionColumn = useMemo(
    () =>
      getApplicantsActionColumns({
        pathname: location.pathname,
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
        <div className="flex justify-between items-center">
          <div>
            <Heading level={3} text={"Manage Applicants"} />
            <Text className="text-sm text-blue-950">
              This is where you manage applicant's applications
            </Text>
          </div>

          <div>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              <HelpCircle size={25} />
            </Button>
          </div>
        </div>

        <hr className="my-3" />
      </Section>

      <div className="mt-3">
        <TabGroup>
          <TabList className="flex gap-4 mb-5">
            {tabLinks.map((tab, index) => {
              if (!tab.authorizeRoles.includes(authorizeRole)) {
                return null;
              }

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
            allowSearch={false}
            rows={rows}
            setRows={setRows}
            columns={columns}
            url={activeTab.url}
            checkboxSelection={false}
          />
        </TabGroup>
      </div>

      <StatusListModal
        title={"Application Statuses"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        statusLists={statuses}
        getStatusColor={getApplicationStatusColor}
      />
    </Page>
  );
};

export default ManageApplicantsPage;
