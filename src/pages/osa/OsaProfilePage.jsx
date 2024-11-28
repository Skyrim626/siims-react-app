import React, { useState } from "react";

const OSAProfilePage = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("osa");

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="relative">
        <img
          src="https://i1.wp.com/www.septic-rescue.com/wp-content/uploads/2017/03/lagoon-1200x300-1.jpg?ssl=1"
          alt="Header"
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <img
            src="https://th.bing.com/th/id/OIP.xtz3I16dFAP1Yo9UFyllWQHaHo?rs=1&pid=ImgDetMain"
            alt="OSA Logo"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div>
            {/* Company Name */}
            <h1 className="text-white text-2xl font-semibold">
              Office of Student Affairs
            </h1>
            {/* Location */}
            <p className="text-white">
              University of Science and Technology of Southern Philippines
              Puntod, Cagayan de Oro City, <br></br>9000 Misamis Oriental,
              Philippines
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-md px-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`px-4 py-2 ${
              activeTab === "osa"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("osa")}
          >
            OSA
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "about"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About Me
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white shadow-md px-6 py-4 mt-4">
        {activeTab === "osa" && (
          <>
            <h2 className="text-xl font-semibold mb-2">OSA Overview</h2>
            <p className="text-gray-600">
              The Office of Student Affairs (OSA) at the University of Science
              and Technology of Southern Philippines (USTP) is committed to
              supporting the holistic development of students. The OSA provides
              services, opportunities, and guidance that help students thrive
              academically, socially, and personally. Their services range from
              co-curricular and extra-curricular activities, to leadership and
              personality development, ensuring that students are prepared for
              the future.
            </p>
            <p className="text-gray-600 mt-4">
              For more information, you can visit the official websites of USTP
              and OSA:
              <br />
              <a
                href="https://www.ustp.edu.ph/"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                USTP Official Website
              </a>
              <br />
              <a
                href="https://www.ustp.edu.ph/jasaan/office-of-the-student-affairs/"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                OSA Official Page
              </a>
            </p>
          </>
        )}

        {activeTab === "about" && (
          <>
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-600">
              <strong>Mission:</strong> The OSA's mission is to provide
              services, support, and opportunities to help students develop
              holistically and be ready for the world of work.
              <br />
              <strong>Vision:</strong> The OSA's vision is to be a model of
              excellence in holistic student development.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Goals and Objectives:
            </h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Facilitating the accreditation of student organizations</li>
              <li>
                Assisting students and organizations with co-curricular and
                extra-curricular activities
              </li>
              <li>Supervising students' behavior and discipline</li>
              <li>
                Developing students' leadership, personality, and communication
                skills
              </li>
              <li>Promoting multicultural sensitivity</li>
              <li>Providing opportunities for community service</li>
            </ul>
            <p className="text-gray-600 mt-4">
              The OSA also reviews documents and prepares a Certificate of
              Compliance for the Dean or Campus Director's approval.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OSAProfilePage;
