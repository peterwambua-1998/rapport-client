import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "@/components/common/layout/SidebarNavigation";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-2">
            <div className="mx-auto px-1 md:px-2">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
