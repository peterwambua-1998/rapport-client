import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/common/layout/HeaderNav";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-[100vw] flex overflow-hidden bg-white ">
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <div className="overflow-y-auto w-full">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {/* <div className="py-2">
            <div className="mx-auto px-1 md:px-2"> */}
              <Outlet /> {/* Render nested routes */}
            {/* </div>
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
