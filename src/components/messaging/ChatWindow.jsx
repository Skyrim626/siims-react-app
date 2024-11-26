import { Button, Input } from "@headlessui/react";
import React, { useState } from "react";
import { FaArrowRight, FaPaperclip, FaSmile } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const ChatWindow = () => {
  const { groupId, messages } = useLoaderData(); // Get groupId and messages from loader data

  console.log(groupId);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
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
  };

  return (
    <div className="flex-1 h-auto flex flex-col ">
      {/* Chat Header */}
      <div className="p-5 border-b bg-gray-100">
        <h3 className="text-lg font-bold"></h3>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-5 h-full overflow-y-auto space-y-4">
        <div className="text-center text-sm text-gray-500 border-b pb-2 mb-4">
          Thursday, June 13
        </div>

        {/* {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 justify-end`}
          >
            <div
              className={`flex items-center space-x-3 max-w-xs p-3 rounded-lg bg-blue-500 text-white`}
            >
              <span className="text-sm"></span>
              <span className="text-xs text-gray-400"></span>
            </div>
          </div>
        ))} */}
      </div>

      {/* Chat Input */}
      <div className="p-5 border-t flex items-center">
        <FaPaperclip className="mr-3 text-gray-500" />
        <FaSmile className="mr-3 text-gray-500" />
        <Input
          type="text"
          // value={newMessage}
          // onChange={(e) => setNewMessage(e.target.value)}
          // onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 py-2 px-4 border border-black rounded-lg focus:outline-none"
        />
        <Button
          // onClick={handleSendMessage}
          className="ml-3 bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
