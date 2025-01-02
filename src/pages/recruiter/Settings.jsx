import React, { useState } from "react";
import Profile from "./EditProfile";
import Password from "./Password";
import SocialProfile from "./SocialProfile";

const ProjectSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "password":
        return <Password />;
      case "social":
        return <SocialProfile />;
      default:
        return <profile />;
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white p-4 max-w-4xl w-full mx-auto rounded-xl shadow-md text-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Profile Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 p-4">
          <div className="col-span-full">
            <div className="border-b border-gray-300 mb-6 flex">
              <nav className="flex space-x-4">
                <button
                  className={`py-2 px-4 ${activeTab === "profile"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "password"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("password")}
                >
                  Change Password
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "social"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("social")}
                >
                  Social
                </button>
              </nav>
            </div>
            <div>{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSettings;
