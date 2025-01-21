import React, { useState } from "react";
import Loader from "../components/common/Loader";
import { Button } from "@headlessui/react";
import Modal from "../components/modals/Modal";
import ProfileContent from "../components/modals/contents/ProfileContent";
import ApplicationContent from "../components/modals/contents/ApplicationContent";
import ReportContent from "../components/modals/contents/ReportContent";

const TestingPage = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile"); // State to track the active tab

  // Tab content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileContent />;
      case "Applications":
        return <ApplicationContent />;
      case "Reports":
        return <ReportContent />;
      default:
        return <p>Content not found.</p>;
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Open</Button>

      <Modal
        modalTitle="Student Info"
        isOpen={open}
        setIsOpen={setOpen}
        minWidth="min-w-[1000px]"
      >
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="flex border-b mb-4">
            {["Profile", "Applications", "Reports"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 focus:outline-none ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>{renderTabContent()}</div>
        </div>
      </Modal>
    </div>
  );
};

export default TestingPage;
