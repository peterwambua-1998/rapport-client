import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header = ({ title, actions }) => {
  return (
    <header className="bg-white shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
      <div className="flex space-x-4">
        {actions &&
          actions.map((action, index) => (
            <Link to={action.path} key={index}>
              <button
                className={`px-4 py-2 rounded-lg ${
                  action.variant === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {action.label}
              </button>
            </Link>
          ))}
      </div>

      {/* <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 sm:mb-0">
          TalentMatch
        </h1>
        <div className="flex space-x-4">
          <Link to="/job-seekers">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              For Job Seekers
            </button>
          </Link>
          <Link to="/recruiters">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              For Recruiters
            </button>
          </Link>
        </div>
      </header> */}
    </header>
  );
};

export default Header;
