// Libraries
import React from "react";

// Components (Common)
import Page from "../../components/common/Page";
import Section from "../../components/common/Section";
import Heading from "../../components/common/Heading";
import Text from "../../components/common/Text";
import {
  User,
  Briefcase,
  MessageSquare,
  Bell,
  Search,
  Home,
} from "lucide-react";
import profilePhoto from "../../assets/images/company/company-profile-photo.jpg";

export default function StudentHomePage() {
  return (
    <Page>
      {/* LinkedIn-style Layout */}
      <div className="flex w-full min-h-screen bg-gray-100">
        {/* Left Sidebar (Profile Summary) */}
        <div className="w-1/4 p-4 bg-white shadow-lg">
          {/* Profile Section */}
          <div className="flex flex-col items-center p-4">
            <img
              src={profilePhoto}
              alt="Profile Photo"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <Heading level={5} text="Student Name" />
            <Text className="text-sm text-gray-600">Student Role</Text>
            <hr className="my-4" />
          </div>

          {/* Quick Links */}
          <ul className="flex flex-col gap-2">
            <li className="text-blue-600 font-bold hover:text-blue-800">
              <Briefcase size={18} className="inline-block mr-2" />
              My Courses
            </li>
            <li className="text-blue-600 font-bold hover:text-blue-800">
              <MessageSquare size={18} className="inline-block mr-2" />
              Messages
            </li>
            <li className="text-blue-600 font-bold hover:text-blue-800">
              <User size={18} className="inline-block mr-2" />
              Connections
            </li>
          </ul>
        </div>

        {/* Main Content (Feed) */}
        <div className="w-2/4 p-4">
          {/* Post Feed */}
          <Section>
            <Heading level={4} text="What's on your mind?" />
            <textarea
              rows="3"
              placeholder="Share an update..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none mb-4"
            />
            <div className="flex justify-between items-center">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Post
              </button>
            </div>
          </Section>

          <Section className="mt-4">
            <div className="p-4 bg-white rounded-md shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={profilePhoto}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <Heading level={5} text="John Doe" />
                  <Text className="text-sm text-gray-600">Student</Text>
                </div>
              </div>
              <Text className="text-sm text-gray-800 mb-2">
                Just completed my final project! Excited to share what I've
                learned.
              </Text>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Like</span>
                <span>Comment</span>
                <span>Share</span>
              </div>
            </div>
          </Section>
        </div>

        {/* Right Sidebar (Extra Info) */}
        <div className="w-1/4 p-4 bg-white shadow-lg">
          <Section>
            <Heading level={5} text="Notifications" />
            <ul className="flex flex-col gap-3 mt-4">
              <li className="flex items-center gap-2 text-gray-800">
                <Bell size={18} className="text-blue-600" />
                <span>New course available: React Basics</span>
              </li>
              <li className="flex items-center gap-2 text-gray-800">
                <Bell size={18} className="text-blue-600" />
                <span>2 new messages from classmates</span>
              </li>
            </ul>
          </Section>
        </div>
      </div>
    </Page>
  );
}
