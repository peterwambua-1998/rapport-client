import React, { useState } from "react";
import EmailConfiguration from "./EmailConfiguration";
import EmailTemplate from "./EmailTemplate";
import ErrorToast from "@/components/toasts/error";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";

const ProjectSettings = () => {
  const [activeTab, setActiveTab] = useState("emailTemplates");

  const renderTabContent = () => {
    switch (activeTab) {
      case "emailTemplates":
        return <EmailTemplate />;
      case "emailConfigurations":
        return <EmailConfiguration />;
      default:
        return <EmailTemplate />;
    }
  };

  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-full">
            <div className="border-b border-gray-300 mb-6">
              <nav className="flex space-x-4">
                <button
                  className={`py-2 px-4 ${activeTab === "emailTemplates"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("emailTemplates")}
                >
                  Email Templates
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "emailConfigurations"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("emailConfigurations")}
                >
                  Email Configurations
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
