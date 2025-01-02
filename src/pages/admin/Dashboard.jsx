import React from "react";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

const Dashboard = () => {
  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <h1 className="text-2xl font-semibold">Dashboard Content</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
