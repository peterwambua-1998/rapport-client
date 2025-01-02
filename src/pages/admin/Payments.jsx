import React, { useState } from "react";
import PaymentsTab from "./PaymentsTab";
import Invoices from "./Invoices";
import Subscriptions from "./Subscriptions"; 

const Payments = () => {
  const [activeTab, setActiveTab] = useState("payments");

  const renderTabContent = () => {
    switch (activeTab) {
      case "payments":
        return <PaymentsTab />;
      case "invoices":
        return <Invoices />;
      case "subscriptions":
        return <Subscriptions />;
      default:
        return <PaymentsTab />;
    }
  };

  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Payments</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-full">
            <div className="border-b border-gray-300 mb-6">
              <nav className="flex space-x-4">
                <button
                  className={`py-2 px-4 ${
                    activeTab === "payments"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab("payments")}
                >
                  Payments
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "invoices"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab("invoices")}
                >
                  Invoices
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "subscriptions"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab("subscriptions")}
                >
                  Subscriptions
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

export default Payments;
