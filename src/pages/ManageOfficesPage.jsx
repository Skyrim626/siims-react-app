import React, { useMemo, useState } from "react";
import Loader from "../components/common/Loader";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import Page from "../components/common/Page";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
import {
  getOfficeActionColumns,
  getOfficeStaticColumns,
} from "../utils/columns";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button, Tab, TabGroup, TabList } from "@headlessui/react";

import { Plus } from "lucide-react";
import useRequest from "../hooks/useRequest";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

const ManageOfficesPage = ({ authorizeRole }) => {
  // ! FOR ADMIN
  const { company_id } = useParams();

  // Tab Links
  const tabLinks = [
    {
      name: "All",
      url:
        authorizeRole === "company"
          ? "/offices"
          : `/offices?companyID=${company_id}`,
    },
    {
      name: "Archives",
      url:
        authorizeRole === "company"
          ? "/offices/archives"
          : `/offices/archives?companyID=${company_id}`,
    },
  ];

  // Open location
  const location = useLocation();
  // Loading State
  const [loading, setLoading] = useState(false);

  // Row State
  const [rows, setRows] = useState([]);

  // Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Select State
  const [activeTab, setActiveTab] = useState(tabLinks[0]);
  const [selectedOffice, setSelectedOffice] = useState({});

  /**
   * Use Request
   */
  const { deleteData } = useRequest({
    setData: setRows,
    setLoading: setLoading,
  });

  /**
   * Modal Functions
   */

  /**
   * Function that opens a modal for delete
   */
  const handleDeleteModal = (row) => {
    // Set Select State
    setSelectedOffice(row);

    // Open Delete Modal
    setIsDeleteOpen(true);
  };

  /**
   * Function that deletes a office
   */
  const deleteOffice = () => {
    // DELETE METHOD
    deleteData({
      url: `/offices/${selectedOffice["id"]}`,
      id: selectedOffice["id"],
      setIsDeleteOpen: setIsDeleteOpen,
    });
  };

  // Static Columns
  const staticColumns = useMemo(
    () =>
      getOfficeStaticColumns({
        pathname: location.pathname,
      }),
    [authorizeRole]
  );

  // Action Column
  const actionColumn = useMemo(
    () =>
      getOfficeActionColumns({
        handleDeleteModal: handleDeleteModal,
        pathname: location.pathname,
      }),
    [authorizeRole]
  );

  // Render Columns
  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );

  return (
    <>
      <Page>
        <Loader loading={loading} />

        <Section>
          <Heading level={3} text="Manage Offices" />
          <Text className="text-md text-blue-950">
            This is where you manage the offices.
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

            {activeTab.name === "All" && (
              <>
                <div className="flex items-end justify-end">
                  <Link to={`${location.pathname}/add`}>
                    <Button
                      className={`transition mb-3 text-sm py-2 px-3 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent bg-blue-600 hover:bg-blue-700`}
                    >
                      <Plus size={20} />
                      <Text>Add new office</Text>
                    </Button>
                  </Link>
                </div>
              </>
            )}

            <DynamicDataGrid
              searchPlaceholder={"Search Office"}
              rows={rows}
              setRows={setRows}
              columns={columns}
              url={activeTab.url}
            />
          </TabGroup>
        </div>

        {/* Delete Form Modal */}
        <DeleteConfirmModal
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          title={`Delete ${selectedOffice["name"]}?`}
          message="Are you sure you want to delete this office?"
          handleDelete={deleteOffice}
        />
      </Page>
    </>
  );
};

export default ManageOfficesPage;
