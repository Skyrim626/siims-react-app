import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import Table from "../../components/tables/Table";
import EmptyState from "../../components/common/EmptyState";

const CompanyManageApplicantsPage = () => {
  // Fetch data
  const { applicants } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(applicants);

  // View Applicant
  const viewApplicant = async (id) => {
    // console.log(id);
    navigate(`${location.pathname}/${id}`);
  };

  return (
    <Page>
      <Section>
        <Heading level={3} text={"Applicants"} />
        <Text className="text-sm text-blue-950">
          This is where you manage the applicants.
        </Text>
        <hr className="my-3" />
      </Section>

      {/* Table */}
      {applicants.length > 0 ? (
        <Table data={applicants} handleView={viewApplicant} />
      ) : (
        <EmptyState
          title="No applicants available at the moment"
          message="Once activities are recorded, applicants will appear here."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          }
        />
      )}
    </Page>
  );
};

export default CompanyManageApplicantsPage;
