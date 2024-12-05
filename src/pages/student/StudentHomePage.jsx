import React, { useState } from "react";
import JobPost from "../../components/workPosts/JobPost";
import { Button, Input } from "@headlessui/react";

const StudentHomePage = () => {
  const [activeTab, setActiveTab] = useState("All Jobs");
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSkillFilterChange = (event) => {
    setSelectedSkills(event.target.value);
  };

  const jobPosts = [
    {
      jobTitle: "Sr. Frontend Engineer",
      company: "Invision",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit consectetuer adipiscing elit consectetuer adipiscing elit consectetuer adipiscing elit...",
      experience: "2 Years",
      salary: "180-250k",
      skills: ["JavaScript", "React", "CSS"],
    },
    {
      jobTitle: "Backend Developer",
      company: "Tech Solutions",
      description: "Sed diam nonummy nibh euismod tincidunt ut laoreet...",
      experience: "3 Years",
      salary: "150-200k",
      skills: ["Node.js", "Git", "SQL"],
    },
  ];

  const filteredJobPosts = jobPosts.filter((post) =>
    post.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
        {/* Profile Sidebar (Fixed Left) */}
        <div className="lg:w-1/4 w-full">
          <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            {/* Profile Header */}
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20">
                <img
                  src="/images/EC25KRDBo-K3w8GexNHSE.png"
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-indigo-600 object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  John Doe
                </h3>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800">
                Contact Information
              </h4>
              <ul className="mt-4 text-sm text-gray-600 space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="text-indigo-600">✉️</span>
                  <a
                    href="mailto:johndoe@example.com"
                    className="text-blue-600 hover:underline"
                  >
                    johndoe@example.com
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-indigo-600">📞</span>
                  <a
                    href="tel:123-456-7890"
                    className="text-blue-600 hover:underline"
                  >
                    123-456-7890
                  </a>
                </li>
              </ul>
            </div>

            {/* Work Experience */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800">
                Work Experience
              </h4>
              <ul className="mt-4 text-sm text-gray-600 space-y-3">
                <li>
                  <strong className="text-gray-900">Frontend Engineer</strong> -
                  Invision
                  <p className="text-xs text-gray-500">Jan 2020 - Present</p>
                </li>
                <li>
                  <strong className="text-gray-900">Junior Developer</strong> -
                  Tech Solutions
                  <p className="text-xs text-gray-500">Jul 2018 - Dec 2019</p>
                </li>
              </ul>
            </div>

            {/* Education */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800">Education</h4>
              <ul className="mt-4 text-sm text-gray-600 space-y-3">
                <li>
                  <strong className="text-gray-900">
                    Bachelor of Science in Information Technology
                  </strong>
                  <p className="text-xs text-gray-500">XYZ University - 2018</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Job Listings and Filters (Scrollable Middle) */}
        <div className="lg:w-1/2 w-full">
          {/* Tabs for filtering job types */}
          <div className="flex space-x-4 border-b border-gray-300 pb-2">
            <Button
              onClick={() => handleTabChange("All Jobs")}
              className={`text-lg font-semibold ${
                activeTab === "All Jobs" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              All Jobs
            </Button>
            <Button
              onClick={() => handleTabChange("Internship")}
              className={`text-lg font-semibold ${
                activeTab === "Internship" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              Internship
            </Button>
            <Button
              onClick={() => handleTabChange("Immersion")}
              className={`text-lg font-semibold ${
                activeTab === "Immersion" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              Immersion
            </Button>
          </div>

          {/* Search Input */}
          <div className="mt-8 flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search job listings..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Duplicate Job Posts for scrolling */}
          <div className="space-y-8">
            {jobPosts.map((post, index) => (
              <JobPost
                key={index}
                jobTitle={post.jobTitle}
                company={post.company}
                description={post.description}
                experience={post.experience}
                salary={post.salary}
                skills={post.skills}
              />
            ))}
          </div>
        </div>

        {/* Skills Filter Sidebar (Fixed Right) */}
        <div className="lg:w-1/4 w-full">
          <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 p-8 rounded-xl shadow-lg border border-indigo-200">
            {/* Sidebar Title */}
            <h4 className="text-2xl font-semibold text-indigo-800 mb-8 tracking-wide">
              Filter by Skill
            </h4>

            {/* Skill Filter Checkboxes */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 text-gray-700">
                <Input
                  type="checkbox"
                  value="JavaScript"
                  onChange={handleSkillFilterChange}
                  checked={selectedSkills.includes("JavaScript")}
                  className="form-checkbox text-indigo-600"
                />
                <span className="text-sm">JavaScript</span>
              </label>

              <label className="flex items-center space-x-3 text-gray-700">
                <Input
                  type="checkbox"
                  value="React"
                  onChange={handleSkillFilterChange}
                  checked={selectedSkills.includes("React")}
                  className="form-checkbox text-indigo-600"
                />
                <span className="text-sm">React</span>
              </label>

              <label className="flex items-center space-x-3 text-gray-700">
                <Input
                  type="checkbox"
                  value="CSS"
                  onChange={handleSkillFilterChange}
                  checked={selectedSkills.includes("CSS")}
                  className="form-checkbox text-indigo-600"
                />
                <span className="text-sm">CSS</span>
              </label>

              <label className="flex items-center space-x-3 text-gray-700">
                <Input
                  type="checkbox"
                  value="Node.js"
                  onChange={handleSkillFilterChange}
                  checked={selectedSkills.includes("Node.js")}
                  className="form-checkbox text-indigo-600"
                />
                <span className="text-sm">Node.js</span>
              </label>

              <label className="flex items-center space-x-3 text-gray-700">
                <Input
                  type="checkbox"
                  value="Git"
                  onChange={handleSkillFilterChange}
                  checked={selectedSkills.includes("Git")}
                  className="form-checkbox text-indigo-600"
                />
                <span className="text-sm">Git</span>
              </label>
            </div>

            {/* Filter Description */}
            <p className="text-sm text-gray-600 mt-5 leading-relaxed">
              Select one or more skills to filter candidates based on their
              expertise.
            </p>

            {/* Reset Button */}
            <Button
              onClick={() => handleSkillFilterChange({ target: { value: [] } })}
              className="mt-6 w-full py-3 px-5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
            >
              Clear Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
