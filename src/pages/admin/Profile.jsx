import React, { useState } from "react";
import EditProfile from "./EditProfile";
import Password from "./Password";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfile />;
      case "password":
        return <Password />;
      default:
        return <profile />;
    }
  };

  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Profile Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-full">
            <div className="border-b border-gray-300 mb-6 flex justify-center">
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
              </nav>
            </div>
            <div>{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
