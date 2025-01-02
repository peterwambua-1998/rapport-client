import React from "react";
import Dashboard from "../pages/admin/Dashboard";
import Features from "../pages/admin/Features";
import Plans from "../pages/admin/Plans";
import Subscriptions from "../pages/admin/Subscriptions";
import Invoices from "../pages/admin/Invoices";
import Payments from "../pages/admin/Payments";
import Recruiters from "../pages/admin/Recruiters";
import Jobseekers from "../pages/admin/Jobseekers";
import Notifications from "../pages/admin/Notifications";
import Settings from "../pages/admin/Settings";
import Profile from "../pages/admin/Profile";
import Users from "../pages/admin/Users";
import Skills from "../pages/admin/Skills";
import ProjectSettings from "../pages/admin/ProjectSettings";


import Industry from "../pages/admin/Industry";
import EducationLevel from "../pages/admin/EducationLevel";
import SkillLevel from "../pages/admin/SkillLevel";
import YearsOfExperience from "../pages/admin/YearsOfExperience";
import Company from "@/pages/admin/Company";


const AdminRoutes = [
  { path: "/admin/dashboard", element: <Dashboard /> },
  { path: "/admin/companies", element: <Company /> },
  { path: "/admin/recruiters", element: <Recruiters /> },
  { path: "/admin/job-seekers", element: <Jobseekers /> },
  { path: "/admin/users", element: <Users /> },
  { path: "/admin/skills", element: <Skills /> },
  { path: "/admin/features", element: <Features /> },
  { path: "/admin/plans", element: <Plans /> },
  { path: "/admin/subscriptions", element: <Subscriptions /> },
  { path: "/admin/invoices", element: <Invoices /> },
  { path: "/admin/payments", element: <Payments /> },
  { path: "/admin/notifications", element: <Notifications /> },
  { path: "/admin/settings", element: <Settings /> },
  { path: "/admin/profile", element: <Profile /> },
  { path: "/admin/profile-settings", element: <ProjectSettings /> },
  { path: "/admin/industry", element: <Industry /> },
  { path: "/admin/education-level", element: <EducationLevel /> },
  { path: "/admin/skill-levels", element: <SkillLevel /> },
  { path: "/admin/experience-duration", element: <YearsOfExperience /> },
];

export default AdminRoutes;
