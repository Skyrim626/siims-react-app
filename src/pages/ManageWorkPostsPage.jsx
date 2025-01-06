import React, { useMemo, useState } from "react";
import Page from "../components/common/Page";
import Section from "../components/common/Section";
import Heading from "../components/common/Heading";
import Text from "../components/common/Text";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import { Plus } from "lucide-react";
import {
  getWorkPostActionColumns,
  getWorkPostStaticColumns,
} from "../utils/columns/workPostColumns";
import DynamicDataGrid from "../components/tables/DynamicDataGrid";
const ManageWorkPostsPage = ({ authorizeRole }) => {
  // Open location and navigate
  const location = useLocation();
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Row state
  const [rows, setRows] = useState([]);

  // Navigate to CompanyAddWorkPostPage.jsx
  const navigateToAddWorkPostPage = () => {
    // console.log(`${location.pathname}/add`);

    navigate(`${location.pathname}/add`);
  };

  // Static Columns
  const staticColumns = useMemo(() => getWorkPostStaticColumns(), []);

  // Action Column
  const actionColumn = useMemo(
    () =>
      getWorkPostActionColumns({
        pathname: location.pathname,
        navigate: navigate,
      }),
    []
  );

  const columns = useMemo(
    () => [...staticColumns, actionColumn],
    [staticColumns, actionColumn]
  );
  return (
    <Page>
      <Section>
        <Heading level={3} text={"Job Posts"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the job posts.
        </Text>

        <hr className="my-3" />

        <div className="flex justify-end items-center">
          <div className="button-group | flex gap-2">
            <Button
              onClick={navigateToAddWorkPostPage}
              className="transition text-sm py-1 px-3 font-bold text-white flex items-center justify-center gap-2 border-2 rounded-md border-transparent ${
                bg-blue-500 hover:bg-blue-600
                }"
            >
              <Plus size={15} />
              <Text>Add new work post</Text>
            </Button>
          </div>
        </div>
      </Section>

      <div className="mt-3">
        <DynamicDataGrid
          searchPlaceholder={"Search Jobs"}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={"/work-posts/v2"}
        />
      </div>
    </Page>
  );
};

export default ManageWorkPostsPage;
