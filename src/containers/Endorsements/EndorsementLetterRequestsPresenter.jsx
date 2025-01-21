import React from "react";
import Page from "../../components/common/Page";
import Loader from "../../components/common/Loader";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import SelectDropDown from "./components/SelectDropDown";
import DynamicDataGrid from "../../components/tables/DynamicDataGrid";

const EndorsementLetterRequestsPresenter = ({
  loading,
  items,
  selectedStatus,
  setSelectedStatus,

  selectedURL,
  setSelectedURL,

  authorizeRole,
  rows,
  setRows,
  columns,
}) => {
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
        <SelectDropDown
          items={items}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedURL={selectedURL}
          setSelectedURL={setSelectedURL}
        />

        <DynamicDataGrid
          searchPlaceholder={"Search Endorsement..."}
          rows={rows}
          setRows={setRows}
          columns={columns}
          url={selectedURL}
          requestedBy={authorizeRole}
          checkboxSelection={false}
        />
      </div>
    </Page>
  );
};

export default EndorsementLetterRequestsPresenter;
