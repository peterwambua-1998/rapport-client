import React from "react";
import { FaTimes } from "react-icons/fa";
import SidebarNavigation from "./SidebarNavigation";
import logo from "../../../assets/images/logo.png";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          onClick={closeSidebar}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-[#4a90e2]">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={closeSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <FaTimes className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-shrink-0 flex items-center px-4">
            {/* <img className="h-8 w-auto" src={logo} alt="" /> */}
            <h1 className="text-2xl font-bold text-black-600">TalentMatch</h1>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <SidebarNavigation closeSidebar={closeSidebar} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-[#4a90e2]">
              <h1 className="text-2xl font-bold text-black-600">TalentMatch</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-[#4a90e2]">
              <div className="px-4 py-2 text-white font-semibold">
                {isAdmin ? "Admin Dashboard" : "User Dashboard"}
              </div>
              <SidebarNavigation closeSidebar={closeSidebar} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
