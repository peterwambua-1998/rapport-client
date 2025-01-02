import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Payments from "../../components/common/subscription/Payments";
import Invoices from "../../components/common/subscription/Invoices";
import CurrentSubscription from "../../components/common/subscription/CurrentSubscription";
import UserPlans from "../../components/common/subscription/UserPlans";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("current");

  const tabs = [
    { id: "current", label: "Current Subscription" },
    { id: "plans", label: "Plans" },
    { id: "payments", label: "Payments" },
    { id: "invoices", label: "Invoices" },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Subscription Management
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">
            {activeTab === "current" && <CurrentSubscription />}
            {activeTab === "plans" && <UserPlans />}
            {activeTab === "payments" && <Payments />}
            {activeTab === "invoices" && <Invoices />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
