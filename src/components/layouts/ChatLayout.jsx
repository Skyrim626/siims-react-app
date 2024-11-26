import React, { useState } from "react";
import UserListItem from "../messaging/UserListItem";
import { Button, Input } from "@headlessui/react";
import SearchUser from "../messaging/SearchUser";
import {
  FaPlus,
  FaSearch,
  FaUsers,
  FaPaperclip,
  FaSmile,
  FaArrowRight,
  FaUser,
} from "react-icons/fa";
import { getRequest, postRequest } from "../../api/apiHelpers";
import MemberList from "../messaging/MemberList";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

const ChatLayout = ({ children }) => {
  const navigate = useNavigate(); // Hook to change the URL
  const location = useLocation();
  // Fetching
  const { myGroups } = useLoaderData();
  console.log(myGroups);

  // Handler to update URL when a group is clicked
  const handleGroupClick = (groupId) => {
    console.log(`${location.pathname}/${groupId}`);
    // Navigate to the group-specific URL (e.g., /messaging/groupId)
    navigate(`${location.pathname}/${groupId}`);
  };

  // Input State for Group
  const [groupName, setGroupName] = useState("");

  /**
   * Search State
   */
  // This search state is for the sidebar
  const [searchInput, setSearchInput] = useState("");
  // This search is for allowing member in the group
  const [searchMembers, setSearchMembers] = useState("");
  // This search is for allowing users in the group
  const [searchedUsers, setSearchedUsers] = useState({ users: [], groups: [] });

  // Containers for search query
  const [members, setMembers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]); // Array to hold selected people

  /* const [groups, setGroups] = useState([
    {
      name: "CP Department",
      lastMessage: "You have a message",
      time: "5:43 PM",
      members: [],
    },
    {
      name: "John Smith",
      lastMessage: "Request for approval...",
      time: "5:43 PM",
      members: [],
    },
    {
      name: "John Doe",
      lastMessage: "Task Completed Sir!",
      time: "5:43 PM",
      members: [],
    },
    {
      name: "Jane Doe",
      lastMessage: "I forgot my daily time...",
      time: "5:43 PM",
      members: [],
    },
  ]); */

  /*  const people = [
    {
      id: 1,
      name: "Hans Zin Sanchez",
      avatar:
        "https://images.unsplash.com/photo-1635795874662-139d7ce9d7d2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "hans@example.com", // Example field to show in profile
    },
    {
      id: 2,
      name: "Jessel Joy Velasco",
      avatar:
        "https://images.unsplash.com/photo-1667409235742-678f1d53b90e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      email: "jessel@example.com", // Example field to show in profile
    },
  ]; */

  const [currentChat, setCurrentChat] = useState("IT Coordinators");
  /* const [messages, setMessages] = useState([
    {
      sender: "Hans Zin",
      text: "Good evening Sir!",
      time: "5:42 PM",
      isOwnMessage: false,
    },
    {
      sender: "You",
      text: "This is a reply from me",
      time: "5:43 PM",
      isOwnMessage: true,
    },
    {
      sender: "Hans Zin",
      text: "Example response",
      time: "5:45 PM",
      isOwnMessage: false,
    },
  ]); */
  const [newMessage, setNewMessage] = useState("");

  /* const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwnMessage: true,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  }; */

  const togglePerson = (person) => {
    setSelectedPeople((prevSelected) => {
      if (prevSelected.includes(person)) {
        return prevSelected.filter((p) => p !== person);
      } else {
        return [...prevSelected, person];
      }
    });
  };

  /**
   * Adds New Group
   */
  const addNewGroup = async () => {
    if (groupName.trim() && selectedPeople.length) {
      console.log(selectedPeople);
      console.log(groupName);

      try {
        // Payload
        const payload = {
          members: selectedPeople,
          name: groupName,
        };

        // POST
        const response = await postRequest({
          url: "/api/v1/messaging/groups",
          data: payload,
        });

        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
      // POST

      // Reset modal fields and close modal
      setIsModalOpen(false);
      setGroupName("");
      setSelectedPeople([]);
    }
  };

  // Search User Or Group
  const searchUser = async () => {
    // Ready payload
    const payload = {
      search: searchInput,
    };

    try {
      // console.log(payload);

      const response = await getRequest({
        url: "/api/v1/messaging/search-users-and-groups",
        data: payload,
      });

      if (response) {
        // console.log(response);
        setSearchedUsers(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Search Member
  const handleSearchMember = async () => {
    // console.log(searchMembers);

    // Ready payload
    const payload = {
      search: searchMembers,
    };

    try {
      const response = await getRequest({
        url: "/api/v1/messaging/search-users",
        data: payload,
      });

      if (response) {
        // console.log(response);
        setMembers(response);
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  // Handle Search User in the Sidebar
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-gray-100 p-5 border-r">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Messages</h2>
        </div>
        {/* Search User */}
        <SearchUser searchUser={searchUser} handleSearch={handleSearch} />

        {/* Add Groups Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center mt-4"
        >
          <FaPlus className="mr-2" /> Add Groups
        </Button>

        {/* Add Group Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold mb-4">New Group</h2>

                  {/* Group Name Input */}
                  <Input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Group Name"
                    className="w-full p-2 mb-4 border rounded"
                  />
                </div>

                <div>
                  <div className="mb-3">
                    <h2 className="text-md font-bold mb-4">Search Member</h2>
                    <Input
                      type="text"
                      value={searchMembers}
                      onChange={(e) => setSearchMembers(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchMembers !== "") {
                          handleSearchMember(); // Cal the search function
                        }
                      }}
                      placeholder="Search Member"
                      className="w-full p-2 mb-4 border rounded"
                    />
                  </div>
                  {members && members.length > 0 && (
                    <div>
                      <h3 className="text-md font-semibold mb-2">Add people</h3>
                      <div className="space-y-3">
                        {members &&
                          members.length > 0 &&
                          members.map((member) => (
                            <MemberList
                              key={member.id}
                              member={member}
                              togglePerson={togglePerson}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Show selected profiles */}
              {/* {selectedPeople.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Selected People
                  </h4>
                  {selectedPeople.map((person) => (
                    <div key={person.id} className="flex items-center mb-2">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-bold">{person.name}</div>
                        <div className="text-sm text-gray-500">
                          {person.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}

              {/* Modal Buttons */}
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSearchMembers("");
                    setMembers([]);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addNewGroup}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Groups List */}
        <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
          {/* Display Users */}
          {searchedUsers.users && searchedUsers.users.length > 0 && (
            <div>
              {searchedUsers.users.map((user) => (
                <UserListItem
                  key={user.id}
                  id={user.id}
                  fullName={user.full_name}
                />
              ))}
            </div>
          )}

          {myGroups && myGroups.length > 0 && (
            <div>
              {myGroups.map((myGroup) => (
                <UserListItem
                  key={myGroup.id}
                  id={myGroup.id}
                  fullName={myGroup.name}
                  handleGroupClick={handleGroupClick}
                />
              ))}
            </div>
          )}

          {/* Groups here */}
          {/* {groups.map((group, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-sm rounded-lg cursor-pointer hover:bg-gray-800 hover:text-white flex flex-col"
              onClick={() => setCurrentChat(group.name)}
            >
              <div className="flex items-center">
                <FaUsers className="mr-3 text-gray-500" />
                <div>
                  <div className="font-bold">{group.name}</div>
                  <div className="text-sm text-gray-400">
                    {group.lastMessage}
                  </div>
                  <span className="text-xs text-gray-300">{group.time}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Members: {group.members.map((m) => m.name).join(", ")}
              </div>
            </div>
          ))} */}
        </div>
      </div>
      {/* Main Content - Chat Window */}
      <Outlet /> {/* This will render the specific chat window */}
    </div>
  );
};

export default ChatLayout;
