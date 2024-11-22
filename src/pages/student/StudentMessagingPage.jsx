import { useState } from 'react'
import {
  FaPlus,
  FaSearch,
  FaUsers,
  FaPaperclip,
  FaSmile,
  FaArrowRight,
} from 'react-icons/fa'

const StudentMessagingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [selectedPeople, setSelectedPeople] = useState([]) // Array to hold selected people
  const [groups, setGroups] = useState([
    {
      name: 'CP Department',
      lastMessage: 'You have a message',
      time: '5:43 PM',
      members: [],
    },
    {
      name: 'John Smith',
      lastMessage: 'Request for approval...',
      time: '5:43 PM',
      members: [],
    },
    {
      name: 'John Doe',
      lastMessage: 'Task Completed Sir!',
      time: '5:43 PM',
      members: [],
    },
    {
      name: 'Jane Doe',
      lastMessage: 'I forgot my daily time...',
      time: '5:43 PM',
      members: [],
    },
  ])

  const people = [
    {
      id: 1,
      name: 'Hans Zin Sanchez',
      avatar:
        'https://images.unsplash.com/photo-1635795874662-139d7ce9d7d2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      email: 'hans@example.com', // Example field to show in profile
    },
    {
      id: 2,
      name: 'Jessel Joy Velasco',
      avatar:
        'https://images.unsplash.com/photo-1667409235742-678f1d53b90e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      email: 'jessel@example.com', // Example field to show in profile
    },
  ]

  const [currentChat, setCurrentChat] = useState('IT Coordinators')
  const [messages, setMessages] = useState([
    {
      sender: 'Hans Zin',
      text: 'Good evening Sir!',
      time: '5:42 PM',
      isOwnMessage: false,
    },
    {
      sender: 'You',
      text: 'This is a reply from me',
      time: '5:43 PM',
      isOwnMessage: true,
    },
    {
      sender: 'Hans Zin',
      text: 'Example response',
      time: '5:45 PM',
      isOwnMessage: false,
    },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isOwnMessage: true,
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  const togglePerson = (person) => {
    setSelectedPeople((prevSelected) => {
      if (prevSelected.includes(person)) {
        return prevSelected.filter((p) => p !== person)
      } else {
        return [...prevSelected, person]
      }
    })
  }

  const handleAddGroup = () => {
    if (groupName.trim() && selectedPeople.length) {
      const newGroup = {
        name: groupName,
        lastMessage: 'New group created',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        members: selectedPeople,
      }

      setGroups([...groups, newGroup])

      // Reset modal fields and close modal
      setIsModalOpen(false)
      setGroupName('')
      setSelectedPeople([])
    }
  }

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-gray-100 p-5 border-r">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Messages</h2>
        </div>
        <div className="relative w-full flex items-center mb-4">
          <FaSearch className="absolute left-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 py-2 border border-black rounded-lg focus:outline-none"
          />
        </div>

        {/* Add Groups Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center mt-4"
        >
          <FaPlus className="mr-2" /> Add Groups
        </button>

        {/* Add Group Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">New Group</h2>

              {/* Group Name Input */}
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                className="w-full p-2 mb-4 border rounded"
              />

              {/* People List */}
              <h3 className="text-md font-semibold mb-2">Add people</h3>
              <div className="space-y-2">
                {people.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center cursor-pointer"
                    onClick={() => togglePerson(person)}
                  >
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="flex-1">{person.name}</span>
                    {selectedPeople.includes(person) && (
                      <span className="text-blue-500 font-bold">✓</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Show selected profiles */}
              {selectedPeople.length > 0 && (
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
              )}

              {/* Modal Buttons */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGroup}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Groups List */}
        <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
          {groups.map((group, index) => (
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
                Members: {group.members.map((m) => m.name).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 h-auto flex flex-col ">
        {/* Chat Header */}
        <div className="p-5 border-b bg-gray-100">
          <h3 className="text-lg font-bold">{currentChat}</h3>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-5 h-full overflow-y-auto space-y-4">
          <div className="text-center text-sm text-gray-500 border-b pb-2 mb-4">
            Thursday, June 13
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.isOwnMessage ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`flex items-center space-x-3 max-w-xs p-3 rounded-lg ${
                  msg.isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <span className="text-sm">{msg.text}</span>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-5 border-t flex items-center">
          <FaPaperclip className="mr-3 text-gray-500" />
          <FaSmile className="mr-3 text-gray-500" />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 py-2 px-4 border border-black rounded-lg focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="ml-3 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StudentMessagingPage;