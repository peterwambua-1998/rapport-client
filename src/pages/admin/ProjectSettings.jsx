import React, { useState } from "react";
import Skills from "./Skills";
import SkillLevel from "./SkillLevel";
import EducationLevel from "./EducationLevel";
import Industry from "./Industry";
import YearsOfExperience from "./YearsOfExperience";
import ProfileVisibility from "./ProfileVisibility";

const ProjectSettings = () => {
  const [activeTab, setActiveTab] = useState("skills");

  const renderTabContent = () => {
    switch (activeTab) {
      case "skills":
        return <Skills />;
      case "skillLevel":
        return <SkillLevel />;
      case "educationLevel":
        return <EducationLevel />;
      case "industry":
        return <Industry />;
      case "yearsOfExperience":
        return <YearsOfExperience />;
      case "profile":
        return <ProfileVisibility />;
      default:
        return <Skills />;
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
            <div className="border-b border-gray-300 mb-6">
              <nav className="flex space-x-4">
                <button
                  className={`py-2 px-4 ${activeTab === "skills"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("skills")}
                >
                  Skills
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "skillLevel"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("skillLevel")}
                >
                  Skill Level
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "educationLevel"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("educationLevel")}
                >
                  Education Level
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "industry"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("industry")}
                >
                  Industry
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "yearsOfExperience"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("yearsOfExperience")}
                >
                  Years of Experience
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "profile"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile Visibility
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
