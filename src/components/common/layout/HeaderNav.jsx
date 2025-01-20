import React, { useState } from "react";
import {
  FaHome,
  FaLightbulb,
  FaHandshake,
  FaEnvelope,
  FaCalendarAlt,
  FaCreditCard,
  FaLifeRing,
  FaBell,
  FaTachometerAlt,
  FaUserTie,
  FaUser,
  FaUsers,
  FaTools,
  FaRocket,
  FaClipboardList,
  FaMoneyBillWave,
  FaCogs,
  FaUserFriends,
  FaTasks,
  FaComments,
  FaCommentDots,
  FaWallet,
  FaQuestionCircle,
  FaBriefcase,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from '@/assets/images/rapport-logo.png'

const HeaderItem = ({ to, Icon, label, isMobile = false }) => {
  const location = useLocation();

  return (
    <NavLink
      to={to}
      className={`flex items-center gap-2 px-4 py-2 hover:text-[#2b4033] ${location.pathname === to ? 'text-[#2b4033]' : 'text-[#949894]'
        } ${isMobile ? 'w-full' : 'flex-col'
        }`}
    >
      <Icon />
      <span className={`${isMobile ? 'text-base' : 'text-sm'}`}>{label}</span>
    </NavLink>
  );
};

const MobileMenu = ({ navItems }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
          <FaBars className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col h-full">
          {/* User Menu at the top of sheet */}
          <div className="py-4 border-b">
            <UserMenu />
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => (
                <HeaderItem
                  key={item.to}
                  to={item.to}
                  Icon={item.icon}
                  label={item.label}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const HeaderNav = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isRecruiter = user?.role === "recruiter";

  const jobseekerNavItems = [
    { to: "/jobseeker/dashboard", icon: FaHome, label: "Home" },
    { to: "/jobseeker/interview-prep", icon: FaLightbulb, label: "Interviews" },
    { to: "/jobseeker/job-matches", icon: FaHandshake, label: "Challenges" },
    { to: "/jobseeker/messages", icon: FaEnvelope, label: "Messaging" },
    { to: "/jobseeker/notifications", icon: FaBell, label: "Notifications" },
  ];

  const adminNavItems = [
    { to: "/admin/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { to: "/admin/companies", icon: FaBriefcase, label: "Companies" },
    { to: "/admin/recruiters", icon: FaUserTie, label: "Recruiters" },
    { to: "/admin/job-seekers", icon: FaUser, label: "Job Seekers" },
    { to: "/admin/users", icon: FaUsers, label: "Users" },
    { to: "/admin/profile-settings", icon: FaTools, label: "Profile Settings" },
    { to: "/admin/features", icon: FaRocket, label: "Features" },
    { to: "/admin/plans", icon: FaClipboardList, label: "Plans" },
    { to: "/admin/payments", icon: FaMoneyBillWave, label: "Payments" },
    { to: "/admin/notifications", icon: FaBell, label: "Notifications" },
    { to: "/admin/settings", icon: FaCogs, label: "Settings" },
  ];

  const recruiterNavItems = [
    { to: "/recruiter/dashboard", icon: FaHome, label: "Home" },
    // { to: "/recruiter/team", icon: FaUserFriends, label: "Team" },
    { to: "/recruiter/projects", icon: FaTasks, label: "Jobs" },
    { to: "/recruiter/messages", icon: FaComments, label: "Messages" },
    { to: "/recruiter/job-seekers", icon: FaUser, label: "Network" },
    // { to: "/recruiter/schedule", icon: FaCalendarAlt, label: "Schedule" },
    // { to: "/recruiter/feedback", icon: FaCommentDots, label: "Feedback & Notes" },
  ];

  const navItems = isAdmin
    ? adminNavItems
    : isRecruiter
      ? recruiterNavItems
      : jobseekerNavItems;

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 items-center bg-white shadow">
      <div className="flex items-center justify-between px-4 w-full">
        <div className="flex gap-4 items-center w-full">
          {/* Logo */}
          <div className="h-14 w-auto flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center   w-full">
            {navItems.map((item) => (
              <HeaderItem
                key={item.to}
                to={item.to}
                Icon={item.icon}
                label={item.label}
              />
            ))}
          </div>
        </div>


        {/* Desktop User Menu */}
        <div className="hidden lg:block">
          <UserMenu />
        </div>

        {/* Mobile Menu Button - Now on the right */}
        <div className="lg:hidden">
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;