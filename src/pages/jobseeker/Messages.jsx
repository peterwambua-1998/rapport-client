import { getJobseekers } from "@/services/api/api";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaBars, FaPaperPlane, FaPhoneAlt, FaPlus, FaTimes, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

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
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      jobSeeker: "Sarah Johnson",
      jobTitle: "Senior Frontend Developer",
      lastMessage: "Looking forward to our technical interview!",
      timestamp: "2024-01-15 10:30 AM",
      unread: false,
      status: "accepted",
    },
    {
      id: 2,
      jobSeeker: "Michael Chen",
      jobTitle: "Full Stack Engineer",
      lastMessage: "Thank you for considering my application",
      timestamp: "2024-01-14 3:45 PM",
      unread: true,
      status: "pending",
    },
    {
      id: 3,
      jobSeeker: "Emily Rodriguez",
      jobTitle: "UX Designer",
      lastMessage: "Can we schedule a portfolio review?",
      timestamp: "2024-01-13 2:15 PM",
      unread: false,
      status: "accepted",
    },
    {
      id: 4,
      jobSeeker: "David Kim",
      jobTitle: "DevOps Engineer",
      lastMessage: "Available for technical discussion this week",
      timestamp: "2024-01-12 11:20 AM",
      unread: false,
      status: "pending",
    },
  ]);
  const [showChatArea, setShowChatArea] = useState(false);
  const [userType, setUserType] = useState("recruiter");
  const [jobRequest, setJobRequest] = useState({
    jobTitle: "",
    jobDescription: "",
    profileLink: "",
    status: "pending",
    jobSeekerId: "",
  });
  const [showJobForm, setShowJobForm] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [meetingType, setMeetingType] = useState("");
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      cId: selectedChat.id,
      id: Date.now(),
      text: newMessage,
      sender: userType,
      timestamp: new Date().toLocaleString(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleJobRequest = (e) => {
    e.preventDefault();
    const newMessage = `Job Request:\nTitle: ${jobRequest.jobTitle}\nDescription: ${jobRequest.jobDescription}\nProfile: ${jobRequest.profileLink}`;
    startNewConversation(jobRequest, newMessage);
    setJobRequest({
      jobTitle: "",
      jobDescription: "",
      profileLink: "",
      status: "pending",
    });
    setShowJobForm(false);
  };

  const startNewConversation = (jobRequest, initialMessage) => {
    const newConversation = {
      id: Date.now(),
      jobSeeker: "Potential Candidate",
      jobTitle: jobRequest.jobTitle,
      lastMessage: initialMessage,
      timestamp: new Date().toLocaleString(),
      unread: false,
      status: "pending",
    };
    setConversations([newConversation, ...conversations]);
    setMessages([
      {
        id: Date.now(),
        text: initialMessage,
        sender: userType,
        timestamp: new Date().toLocaleString(),
      },
    ]);
  };

  const selectConversation = (conversation) => {
    setSelectedChat(conversation);
    setShowChatArea(true);
    setShowMobileMenu(false);
  };

  const getAllJobSeekers = async () => {
    try {
      const res = await getJobseekers()
      setJobSeekers(res.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllJobSeekers()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FadeLoader />
        <p>Setting up inbox...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 h-full">
      <div className="container mx-auto px-2 py-2 sm:px-4">
        <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row h-[96vh]">
          {/* Conversation List */}
          <div
            className={`
            md:w-1/3 border-r overflow-y-auto
            ${showChatArea ? 'hidden md:block' : 'block'}
          `}
          >
            <div className="p-4 border-b flex gap-4 items-center">
              <FaArrowLeft className="hover:cursor-pointer" onClick={() => navigate(-1)} />
              <h2 className="text-xl font-semibold">Messages</h2>
            </div>

            {/* Conversations List */}
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => selectConversation(conv)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedChat?.id === conv.id ? "bg-blue-50" : ""
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{conv.jobSeeker}</h3>
                      <p className="text-sm text-gray-600">{conv.jobTitle}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {conv.timestamp}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {conv.lastMessage}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${conv.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : conv.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {conv.status.charAt(0).toUpperCase() + conv.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={`
            flex-1 
            ${!showChatArea ? 'hidden md:block' : 'block'}
          `}
          >
            {!selectedChat ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <i className="fas fa-inbox text-4xl mb-2"></i>
                <p className="text-center px-4">Select a conversation to start messaging</p>
              </div>
            ) : (
              <>
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <button
                      className="md:hidden mr-4 text-gray-600"
                      onClick={() => {
                        setShowChatArea(false);
                        setShowMobileMenu(true);
                      }}
                    >
                      <FaArrowLeft />
                    </button>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {selectedChat?.jobSeeker}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {selectedChat?.jobTitle}
                      </p>
                    </div>
                  </div>
                 
                </div>

                {/* Messages Area */}
                <div className="h-[calc(100%-170px)] overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${message.sender === userType ? "ml-auto text-right" : ""
                        }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg max-w-[80%] ${message.sender === userType
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                          }`}
                      >
                        {message.text}
                        <div className="text-xs mt-1 opacity-75">
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleMessageSubmit} className="p-4 border-t">
                  <div className="flex  gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Messages;
