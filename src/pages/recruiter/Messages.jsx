import React, { useState } from "react";

const messages = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    date: "2024-01-15 10:30 AM",
    status: "Accepted",
    messages: [
      { isUser: false, msg: "Looking forward to our technical interview!" },
      { isUser: true, msg: "Alright, I will talk to you", dateTime: "10/01/2024 9:07 PM" },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full Stack Engineer",
    date: "2024-01-13 3:45 PM",
    status: "Pending",
    messages: [
      { isUser: false, msg: "Thank you for considering my application!" },
      { isUser: true, msg: "Alright, I will talk to you", dateTime: "07/11/2024 5:12 PM" },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    date: "2024-01-13 2:15 PM",
    status: "Accepted",
    messages: [
      { isUser: false, msg: "Thank you for considering my application!" },
      { isUser: true, msg: "Alright, I will talk to you", dateTime: "07/11/2024 5:12 PM" },
    ],
  },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat !== null) {
      const updatedMessages = [...messages];
      updatedMessages[selectedChat].messages.push({ isUser: true, msg: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Messages</h2>
          <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded">
            + New Request
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              onClick={() => setSelectedChat(index)}
              className={`p-4 border-b cursor-pointer ${
                selectedChat === index ? "bg-gray-100" : ""
              }`}
            >
              <h3 className="text-sm font-semibold">{msg.name}</h3>
              <p className="text-xs text-gray-500">{msg.role}</p>
              <p className="text-xs text-gray-400">{msg.date}</p>
              <span
                className={`text-xs rounded px-2 py-1 ${
                  msg.status === "Accepted"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {msg.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat === null ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Select a conversation or start a new job request</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b bg-white">
              <h2 className="text-lg font-semibold">
                {messages[selectedChat].name}
              </h2>
              <p className="text-sm text-gray-500">
                {messages[selectedChat].role}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedChat].messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg w-fit max-w-md ${
                    msg.isUser
                      ? "ml-auto bg-blue-500 text-white"
                      : "mr-auto bg-gray-200 text-black"
                  }`}
                >
                  {msg.msg}
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex items-center bg-white">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
