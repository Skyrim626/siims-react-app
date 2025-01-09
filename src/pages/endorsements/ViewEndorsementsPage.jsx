import { useTheme } from "@emotion/react";
import React, { useMemo, useState } from "react";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import { getEndorsementStaticColumns } from "../../utils/columns/endorsementColumns";
import DynamicDataGrid from "../../components/tables/DynamicDataGrid";

const ViewEndorsementsPage = ({ authorizeRole }) => {
  // Row state
  const [rows, setRows] = useState([]);

  // Static Columns
  const staticColumns = useMemo(() => getEndorsementStaticColumns(), []);

  const columns = useMemo(() => [...staticColumns], [staticColumns]);

  return (
    <Page>
      <Section>
        <Heading level={3} text="View Endorsements" />
        <Text className="text-md text-blue-950">
          This is where you view your endorsements
        </Text>
        <hr className="my-3" />
      </Section>

      <DynamicDataGrid
        allowSearch={false}
        checkboxSelection={false}
        rows={rows}
        setRows={setRows}
        columns={columns}
        url={"/endorsements"}
      />
    </Page>
  );
};

export default ViewEndorsementsPage;
