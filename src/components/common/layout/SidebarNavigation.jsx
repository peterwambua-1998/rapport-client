import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

import { useAuth } from "../../../context/AuthContext";

const NavItem = ({ to, icon: Icon, children, onClick }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    onClick(); // Close the sidebar on mobile
    navigate(to); // Navigate to the new route
  };

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 text-sm font-medium ${isActive
          ? "bg-blue-800 text-white"
          : "text-blue-100 hover:bg-blue-600"
        }`
      }
      onClick={handleClick}
    >
      <Icon className="mr-3 h-4 w-4" /> {/* Reduced size */}
      {children}
    </NavLink>
  );
};

const SidebarNavigation = ({ closeSidebar }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isRecruiter = user?.role === "recruiter";
  const isJobseeker = user?.role === "jobseeker";

  const jobseekerNavItems = [
    { to: "/jobseeker/dashboard", icon: FaHome, label: "Dashboard" },
    {
      to: "/jobseeker/interview-prep",
      icon: FaLightbulb,
      label: "Interview Preparation",
    },
    { to: "/jobseeker/job-matches", icon: FaHandshake, label: "Job Matches" },
    { to: "/jobseeker/messages", icon: FaEnvelope, label: "Messages" },
    { to: "/jobseeker/schedule", icon: FaCalendarAlt, label: "Schedule" },
    { to: "/jobseeker/help-center", icon: FaLifeRing, label: "Help Center" },
    { to: "/jobseeker/notifications", icon: FaBell, label: "Notifications" },
    { to: "/jobseeker/profile", icon: FaUser, label: "Profile" },
  ];

  const adminNavItems = [
    { to: "/admin/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { to: "/admin/companies", icon: FaUserTie, label: "Company" },
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
    { to: "/recruiter/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "/recruiter/team", icon: FaUserFriends, label: "Team" },
    { to: "/recruiter/projects", icon: FaTasks, label: "Projects Hub" },
    { to: "/recruiter/job-seekers", icon: FaUser, label: "Job Seekers Hub" },
    { to: "/recruiter/messages", icon: FaComments, label: "Messaging" },
    { to: "/recruiter/schedule", icon: FaCalendarAlt, label: "Schedule" },
    {
      to: "/recruiter/feedback",
      icon: FaCommentDots,
      label: "Feedback & Notes",
    },
    {
      to: "/recruiter/subscriptions",
      icon: FaWallet,
      label: "Payments & Subscription",
    },
    {
      to: "/recruiter/help-center",
      icon: FaQuestionCircle,
      label: "Help Center",
    },
    { to: "/recruiter/notifications", icon: FaBell, label: "Notifications" },
    { to: "/recruiter/profile", icon: FaUser, label: "Profile" },
  ];

  const navItems = isAdmin
    ? adminNavItems
    : isRecruiter
      ? recruiterNavItems
      : jobseekerNavItems;

  return (
    <nav className="mt-5 flex-1 px-2 space-y-1">
      {navItems.map((item) => (
        <NavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          onClick={closeSidebar}
        >
          {item.label}
        </NavItem>
      ))}
    </nav>
  );
};

export default SidebarNavigation;
