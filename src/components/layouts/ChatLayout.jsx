import React from "react";

const ChatLayout = ({ user, header, children }) => {
  const conversation = "";
  const selectedConversation = "";

  console.log("conversations", conversation);
  console.log("selectedConversations", selectedConversation);

  return (
    <div>
      Chat Layout
      <div>{children}</div>
    </div>
  );
};

export default ChatLayout;
