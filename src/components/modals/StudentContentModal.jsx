import React, { useState } from "react";
import ProfileContent from "./contents/ProfileContent";
import ApplicationContent from "./contents/ApplicationContent";
import ReportContent from "./contents/ReportContent";
import { Button } from "@headlessui/react";
import Modal from "./Modal";
import getFullName from "../../utils/getFullName";
import { getFullAddress } from "../../utils/formatAddress";
import CertificatesContent from "./contents/CertificatesContent";

const StudentContentModal = ({ open, setOpen, student, location }) => {
  const [activeTab, setActiveTab] = useState("Profile"); // State to track the active tab

  // console.log(student);

  // console.log(location);

  // Concatenate name.
  const fullName = getFullName(
    student.first_name,
    student.middle_name,
    student.last_name
  );

  // Format Address
  const fullAddress = getFullAddress({
    street: student.street,
    barangay: student.barangay,
    city: student.city,
    province: student.province,
    postalCode: student.postal_code,
  });

  // Tab content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <ProfileContent
            location={location}
            student_id={student.id}
            name={fullName}
            email={student.email}
            phone_number={student.phone_number}
            gender={student.gender}
            address={fullAddress}
            program={student.program.name}
            college={student.college.name}
            created_at={student.created_at}
            age={student.age}
            date_of_birth={student.date_of_birth}
            last_applied_at={student.last_applied_at}
            status={student.status}
            latest_application={student.latest_application}
            profile_image_url={student.profile_image_url}
          />
        );
      case "Applications":
        return (
          <ApplicationContent
            applications={student.applications}
            applicationLocation={location}
          />
        );
      case "Reports":
        return <ReportContent latestApplication={student.latest_application} />;
      case "Certificates":
        return <CertificatesContent certificates={student.certificates} />;

      default:
        return <p>Content not found.</p>;
    }
  };

  return (
    <Modal
      modalTitle="Student Info"
      isOpen={open}
      setIsOpen={setOpen}
      minWidth="min-w-[1250px]"
    >
      <div className="flex flex-col">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          {["Profile", "Applications", "Reports", "Certificates"].map((tab) => (
            <Button
              key={tab}
              className={`px-4 py-2 focus:outline-none ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div>{renderTabContent()}</div>
      </div>
    </Modal>
  );
};

export default StudentContentModal;
