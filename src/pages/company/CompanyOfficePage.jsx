import React, { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import { deleteRequest, getRequest } from "../../api/apiHelpers";
import ContentLoader from "../../components/atoms/ContentLoader";
import Text from "../../components/common/Text";
import { MapPin } from "lucide-react";
import { Button } from "@headlessui/react";
import { stripLocation } from "../../utils/strip";
import sampleJobs from "../../data/jobs-data";
import { concatenateLocation } from "../../utils/concatenation";

// Render Button Tabs
const buttonTabs = [
  {
    title: "Jobs",
    value: "jobs",
  },
  {
    title: "Supervisor",
    value: "supervisor",
  },
];

const CompanyOfficePage = () => {
  // Fetch office data
  const { initial_office, supervisor_assigned, supervisors, work_posts } =
    useLoaderData();
  // console.log(initial_office);

  // console.log(work_posts);

  // console.log(initial_office);

  // console.log(`${location}/add-job`);

  const office = initial_office;
  const [jobs, setJobs] = useState(sampleJobs);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  // console.log(location);

  // Use the concatenateLocation function to build the path
  const strippedLocation = concatenateLocation(
    location,
    `edit-office/${office.id}`
  );

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const [selectedTab, setSelectedTab] = useState(buttonTabs[0].value);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Delete this office
  const deleteOffice = async () => {
    // console.log(office.id);

    try {
      // Make the DELETE request
      const response = await deleteRequest({
        url: `/api/v1/company/offices/${office.id}`,
      });

      // return back to navigate
      navigate("/auth/company/offices");
    } catch (error) {
      console.log(`Cannot delete a program: `, error);
    }
  };

  return (
    <>
      <Page>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {/* Office Details Section */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{office.office_type}</div>
                <h1 className="text-2xl font-bold mb-4">{office.name}</h1>
                <div className="flex items-center gap-1 text-red-500 mb-4">
                  <MapPin size={20} />
                  <Text>{office.full_address}</Text>
                </div>
              </div>

              {/* Button Tabs for Job and Supervisor Sections */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex gap-3 mb-4">
                  {buttonTabs.map((buttonTab) => (
                    <Button
                      key={buttonTab.value}
                      onClick={() => setSelectedTab(buttonTab.value)}
                      className={`flex-1 text-lg font-semibold text-blue-500 border-b-2 transition duration-300 ease-in-out ${
                        buttonTab.value === selectedTab
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent hover:border-blue-600"
                      }`}
                    >
                      {buttonTab.title}
                    </Button>
                  ))}
                </div>
                <div>
                  {selectedTab === buttonTabs[0].value && (
                    // Job List Section
                    <div>
                      <Text className="text-indigo-800 text-lg font-bold mb-4">
                        Job Openings
                      </Text>

                      <div
                        className="space-y-4 overflow-y-auto"
                        style={{ maxHeight: "300px" }}
                      >
                        {work_posts
                          ? work_posts.map((workPost, index) => (
                              <Link
                                key={workPost["id"]}
                                to={`/auth/company/offices/${office.id}/work-posts/${workPost.id}`}
                              >
                                <div className="p-4 border rounded-lg shadow-sm bg-indigo-50">
                                  <h2 className="font-semibold">
                                    {workPost.title}
                                  </h2>
                                  <Text className="text-gray-600">
                                    {workPost.responsibilities}
                                  </Text>
                                  <br />
                                  <Text className="text-indigo-800 font-bold">
                                    Max Applicants: {workPost.max_applicants}
                                  </Text>
                                </div>
                              </Link>
                            ))
                          : "No work posts available"}
                      </div>

                      {/* Pagination Controls */}
                      <div className="flex justify-between mt-4">
                        <Button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                          Previous
                        </Button>
                        <div className="flex items-center">
                          <Text className="mx-2">
                            Page {currentPage} of {totalPages}
                          </Text>
                        </div>
                        <Button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                  {selectedTab === buttonTabs[1].value && (
                    // Supervisor Info Section
                    <div className="bg-white p-6">
                      <Text className="text-indigo-800 text-lg font-bold mb-4">
                        Assigned Supervisor
                      </Text>
                      <div className="flex flex-col md:flex-row justify-between items-center mb-6 mt-3">
                        <div className="flex items-center">
                          <img
                            src="https://via.placeholder.com/60" // Replace with actual image URL
                            alt="Supervisor"
                            className="rounded-full border border-indigo-200"
                            height={40}
                            width={40}
                          />
                          <div className="ml-4 flex items-center gap-2">
                            <Text className="text-sm font-semibold">
                              Current
                            </Text>
                            <Text className="text-gray-600">
                              {supervisor_assigned
                                ? supervisor_assigned.full_name
                                : "No supervisor"}
                            </Text>
                          </div>
                        </div>
                        {supervisor_assigned && (
                          <Button
                            onClick={() => {
                              // Logic to edit the current supervisor
                              console.log(supervisor_assigned.id);
                            }}
                            className="text-sm whitespace-nowrap mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-sm transition duration-300"
                          >
                            Edit Supervisor
                          </Button>
                        )}
                      </div>

                      {/* <Text className="text-gray-700 mb-4">
                        To assign a new supervisor, please select a candidate
                        from the list below.
                      </Text>

                      <Text className="text-indigo-800 font-bold mb-2">
                        Available Candidates
                      </Text>
                      <div className="space-y-4">
                        {["Alice Smith", "Michael Johnson"].map(
                          (candidate, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-indigo-50 hover:bg-indigo-100 transition duration-300"
                            >
                              <div className="flex items-center">
                                <img
                                  src="https://via.placeholder.com/40" // Replace with actual candidate image URL
                                  alt={candidate}
                                  className="rounded-full border border-indigo-200"
                                />
                                <Text className="ml-2 font-semibold">
                                  {candidate}
                                </Text>
                              </div>
                              <Button
                                onClick={() => {
                                  // Logic to assign this candidate as supervisor
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300"
                              >
                                Assign
                              </Button>
                            </div>
                          )
                        )}
                      </div>

                      <div className="mt-6">
                        <Text className="text-gray-600">
                          Note: Ensure the candidate is well-informed about
                          their responsibilities before assigning.
                        </Text>
                      </div> */}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Office Information Section */}
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Text className="text-xl font-bold mb-6">Office Info</Text>
                <hr className="my-4" />
                <Text className="text-xl">Contact Phone:</Text>
                <div className="my-2">
                  <Text className="bg-indigo-100 p-2 font-bold">
                    {office.phone_number}
                  </Text>
                </div>
              </div>

              {/* Manage Office Section */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <Text className="text-xl font-bold mb-6">Manage Office</Text>
                {/* <Link to={`${location}/add-job`}>
                  <Button className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4">
                    Add Job
                  </Button>
                </Link> */}
                <Link to={strippedLocation}>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4">
                    Edit Office
                  </Button>
                </Link>
                <Button
                  onClick={deleteOffice}
                  className="bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline mt-4"
                >
                  Delete Office
                </Button>
              </div>
            </aside>
          </div>
        </Section>
      </Page>
    </>
  );
};

export default CompanyOfficePage;
