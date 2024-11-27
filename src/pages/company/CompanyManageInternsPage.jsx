import React, { useState } from "react";
import Section from "../../components/common/Section";
import ManageHeader from "../../components/common/ManageHeader";
import useSearch from "../../hooks/useSearch";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/common/Modal";
import { getRequest, postRequest } from "../../api/apiHelpers";
import Page from "../../components/common/Page";
import Table from "../../components/tables/Table";
import Heading from "../../components/common/Heading";
import InternForm from "../../components/forms/InternForm"; 

const ManageInternsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [internInfo, setInternInfo] = useState({});
  const [term, setTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [interns, setInterns] = useState([
    {
      id: 1,
      jobTitle: "Software Developer Intern",
      studentId: "2024001",
      firstName: "John",
      middleName: "A.",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      reports: {
        DTR: "/reports/dtr/john-doe.pdf",
        weeklyReport: "/reports/weekly/john-doe.pdf",
        personalInsight: "/reports/insight/john-doe.pdf",
      },
      status: "Active",
    },
    // Add more interns as needed
  ]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setTerm(term);
    setFilteredData(
      interns.filter((intern) =>
        Object.values(intern)
          .join(" ")
          .toLowerCase()
          .includes(term)
      )
    );
  };

  // Handle form input change for adding/editing intern
  const handleInternInfoChange = (event) => {
    const { name, value } = event.target;
    setInternInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleAddSubmit = () => {
    // Logic to add a new intern
    setIsOpen(false);
  };

  return (
    <>
      <Page>
        <Section className="mt-4">
          <div className="flex justify-between items-center">
            <div>
              <Heading level={3} text={"Manage Interns"} />
              <p className="text-blue-950 text-sm">
                This is where you can manage your interns and their reports.
              </p>
            </div>
          </div>
          <hr className="my-3" />
        </Section>
        <Section>
          <ManageHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            addPlaceholder="Add New Intern"
          />
          {interns.length !== 0 && (
            <Table
              data={filteredData.length > 0 ? filteredData : interns}
              term={term}
              filteredData={filteredData}
              handleSearchChange={handleSearchChange}
              columns={[
                { header: "ID", key: "id" },
                { header: "Job Title", key: "jobTitle" },
                { header: "Student ID", key: "studentId" },
                { header: "First Name", key: "firstName" },
                { header: "Middle Name", key: "middleName" },
                { header: "Last Name", key: "lastName" },
                { header: "Email", key: "email" },
                { header: "Phone Number", key: "phoneNumber" },
                {
                  header: "Reports",
                  render: (row) => (
                    <div>
                      <a
                        href={row.reports.DTR}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        DTR
                      </a>
                      {" | "}
                      <a
                        href={row.reports.weeklyReport}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Weekly Report
                      </a>
                      {" | "}
                      <a
                        href={row.reports.personalInsight}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Personal Insight
                      </a>
                    </div>
                  ),
                },
                { header: "Status", key: "status" },
                {
                  header: "Actions",
                  render: (row) => (
                    <div>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                        View
                      </button>
                      <button className="bg-green-500 text-white px-3 py-1 rounded">
                        Evaluate
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          )}
          <Modal
            modalTitle="Create Intern"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleSubmit={handleAddSubmit}
          >
            <InternForm
              isFormModal={true}
              method={"post"}
              internInfo={internInfo}
              handleInternInfoChange={handleInternInfoChange}
            />
          </Modal>
        </Section>
      </Page>
    </>
  );
};

export default ManageInternsPage;
