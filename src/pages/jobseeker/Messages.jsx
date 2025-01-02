import React, { useState, useEffect } from "react";
import {
  getConversations,
  getMessages,
  createMessage,
  updateConversationStatus,
} from "../../services/api/api";
import { Button } from "@/components/ui/button";
import { FadeLoader } from "react-spinners";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchConversations = async () => {
  //   try {
  //     // const response = await getConversations();
  //     // setConversations(response.data);
  //     setConversations(dummyConversations);

  //   } catch (error) {
  //     console.error("Error fetching conversations:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchProjects = async (id) => {
    try {
      // const response = await getMessages(id); // Assuming this returns projects
      // setProjects(response.data);
      const conversation = dummyConversations.find((conv) => conv.id === id);
      setProjects(conversation?.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const formatConversations = (dbResponse) => {
    // Transform the database response into the desired dummyConversations format
    const formattedConversations = dbResponse.reduce((acc, conversation) => {
      const recruiterId = conversation.recruiter.id;

      // Find if the recruiter already exists in the accumulated conversations
      let recruiterConversation = acc.find((conv) => conv.id === recruiterId);


      if (!recruiterConversation) {
        // If the recruiter does not exist, create a new entry
        recruiterConversation = {
          id: recruiterId,
          name: `${conversation.recruiter.RecruiterProfile.first_name} ${conversation.recruiter.RecruiterProfile.last_name}`,
          role: conversation.recruiter.RecruiterProfile.company_name || "Unknown",
          date: new Date(conversation.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: conversation.status || "Pending",
          projects: [],
        };
        acc.push(recruiterConversation);
      }

      // Add the project and its messages to the recruiter
      recruiterConversation.projects.push({
        id: conversation.Project.id,
        title: conversation.Project.name,
        description: conversation.Project.description,
        messages: conversation.Messages.map((msg) => ({
          isUser: msg.isUser === conversation.jobSeekerId,
          msg: msg.message,
        })),
      });

      return acc;
    }, []);

    return formattedConversations;
  };

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      // setMessages(response.data);
      const newArr = formatConversations(response.data)
      // const formattedConversations = response.data.map((conversation) => ({
      //   id: conversation.id,
      //   name: conversation.User.RecruiterProfile.first_name + " " + conversation.User.RecruiterProfile.last_name,
      //   role: conversation.User.RecruiterProfile.company_name,
      //   date: new Date(conversation.createdAt).toLocaleString("en-US", {
      //     year: "numeric",
      //     month: "short",
      //     day: "numeric",
      //     hour: "2-digit",
      //     minute: "2-digit",
      //   }),
      //   status: conversation.status || "Pending",
      //   projects: [
      //     {
      //       id: conversation.Project.id,
      //       title: conversation.Project.name,
      //       description: conversation.Project.description,
      //       messages: conversation.Messages.map((message) => ({
      //         isUser: message.isUser === conversation.jobSeekerId,
      //         msg: message.message,
      //       })),
      //     },
      //   ],
      // }));
      setConversations(newArr)
      setLoading(false)

      // const project = projects.find((proj) => proj.id === projectId);
      // setMessages(project?.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);



  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedProject !== null) {
      const updatedMessages = [...messages];
      updatedMessages.push({
        isUser: true,
        msg: newMessage,
      });

      await createMessage({ conversationId: selectedProject, message: newMessage });
      setNewMessage("");
      setMessages(updatedMessages);
    }
  };

  const handleConversationClick = (index, conversationId) => {
    setSelectedChat(index);
    const conversation = conversations.find((conv) => conv.id === conversationId);
    setProjects(conversation?.projects || []); // Set projects for the selected conversation
    setSelectedProject(null); // Reset selected project
    setMessages([]); // Clear messages
  };

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
    const project = projects.find((proj) => proj.id === projectId);
    setMessages(project?.messages || []); // Set messages for the selected project
    // get
  };

  const handleAcceptance = async (st) => {
    console.log(selectedProject)
    try {
      const shortListed = await fetch(`${API_BASE_URL}/api/listing/job-seekers`, {
        method: 'POST',
        credentials: 'include',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
          status: id,
          id: ''
        }),
      })
    } catch (error) {
      console.log(error);

    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
          <FadeLoader />
          <p>Loading conversations...</p>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Conversations</h2>
          {/* <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded">
            + New Request
          </button> */}
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Currently no message from any recruiter</div>
          ) : (
            conversations.map((conv, index) => (
              <div
                key={conv.id}
                onClick={() => handleConversationClick(index, conv.id)}
                className={`p-4 border-b cursor-pointer ${selectedChat === index ? "bg-gray-100" : ""}`}
              >
                <h3 className="text-sm font-semibold">{conv.name}</h3>
                <p className="text-xs text-gray-500">{conv.role}</p>
                <p className="text-xs text-gray-400">{conv.date}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat === null ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>Select a conversation to view projects</p>
          </div>
        ) : selectedProject === null ? (
          <>
            <div className="p-4 border-b bg-white">
              <h2 className="text-lg font-semibold">
                {conversations[selectedChat]?.name}
              </h2>
              <p className="text-sm text-gray-500">
                {conversations[selectedChat]?.role}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-200"
                >
                  <h3 className="text-md font-semibold">{project.title}</h3>
                  {/* <p className="text-sm text-gray-600 truncate">{project.description}</p> */}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="p-4 border-b bg-white">
              <div>
                <h2 className="text-lg font-semibold">
                  {projects.find((p) => p.id === selectedProject)?.title}
                </h2>
                <p className="text-sm text-gray-500">Messages</p>
              </div>

            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                index == 0 ?

                  <div
                    key={index}
                    className={`p-3 w-fit max-w-md ${msg.isUser
                      ? "ml-auto bg-blue-200 text-black rounded-ss-lg text-xs rounded-se-lg rounded-es-lg font-semibold"
                      : "mr-auto bg-yellow-200 text-black rounded-ss-lg text-xs rounded-se-lg rounded-ee-lg font-semibold"
                      }`}
                  >
                    <p className="mb-2">{msg.msg}</p>
                    <Button size={'sm'} className="bg-blue-200 hover:bg-blue-400 font-semibold text-black" onClick={() => handleAcceptance('accept')}>Accept</Button>
                    <Button size={'sm'} className="bg-blue-200 hover:bg-blue-400 font-semibold text-black" onClick={() => handleAcceptance('reject')}>Reject</Button>
                  </div>
                  :

                  <div
                    key={index}
                    className={`p-3 w-fit max-w-md ${msg.isUser
                      ? "ml-auto bg-blue-200 text-black rounded-ss-lg text-xs rounded-se-lg rounded-es-lg font-semibold"
                      : "mr-auto bg-yellow-200 text-black rounded-ss-lg text-xs rounded-se-lg rounded-ee-lg font-semibold"
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
export const dummyConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    date: "2024-01-15 10:30 AM",
    status: "Accepted",
    projects: [
      {
        id: 101,
        title: "Portfolio Website",
        description: "A responsive portfolio website for showcasing skills.",
        messages: [
          { isUser: false, msg: "Can we discuss the layout design?" },
          { isUser: true, msg: "Sure, let's finalize it this week." },
        ],
      },
      {
        id: 102,
        title: "Admin Dashboard",
        description: "A custom admin dashboard for managing tasks.",
        messages: [
          { isUser: false, msg: "Are the chart components reusable?" },
          { isUser: true, msg: "Yes, we can modularize them for reusability." },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full Stack Engineer",
    date: "2024-01-13 3:45 PM",
    status: "Pending",
    projects: [
      {
        id: 201,
        title: "E-Commerce Platform",
        description: "An e-commerce platform with payment gateway integration.",
        messages: [
          { isUser: false, msg: "Do we need to support multiple currencies?" },
          { isUser: true, msg: "Yes, let's include currency conversion support." },
        ],
      },
      {
        id: 202,
        title: "Inventory Management System",
        description: "A system to manage and track inventory in real-time.",
        messages: [
          { isUser: false, msg: "Can we implement barcode scanning?" },
          { isUser: true, msg: "Yes, barcode scanning can be integrated." },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    date: "2024-01-13 2:15 PM",
    status: "Accepted",
    projects: [
      {
        id: 301,
        title: "Mobile App Redesign",
        description: "Redesign of a mobile app for better usability.",
        messages: [
          { isUser: false, msg: "What color palette are we using?" },
          { isUser: true, msg: "We are using a dark theme with vibrant accents." },
        ],
      },
    ],
  },
]; 