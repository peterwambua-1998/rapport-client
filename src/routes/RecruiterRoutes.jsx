import React from "react";
import Dashboard from "../pages/recruiter/Dashboard";
import Plans from "../pages/recruiter/Plans";
import Subscriptions from "../pages/recruiter/Subscriptions";
import Invoices from "../pages/recruiter/Invoices";
import Payments from "../pages/recruiter/Payments";
import Team from "../pages/recruiter/Team";
import Notifications from "../pages/recruiter/Notifications";
import Settings from "../pages/recruiter/Settings";
import Profile from "../pages/recruiter/Profile";
import Messages from "../pages/recruiter/Messages";
import Projects from "../pages/recruiter/Projects";
import HelpCenter from "../components/common/Help/HelpCenter";
import Feedback from "../pages/recruiter/Feedback";
import Schedule from "../pages/recruiter/Schedule";
import Candidates from "../pages/recruiter/Candidates";
import JobSeekers from "../pages/recruiter/Jobseekers";
import EditProfile from "../pages/recruiter/EditProfile"; 
import JobSeekerProfile from "@/pages/recruiter/JobSeekerProfile";
import ProjectDetails from "@/pages/recruiter/ProjectDetails";

const recruiterRoutes = [
  { path: "/recruiter/dashboard", element: <Dashboard /> },
  { path: "/recruiter/team", element: <Team /> },
  { path: "/recruiter/messages", element: <Messages /> },
  { path: "/recruiter/projects", element: <Projects /> },
  { path: "/recruiter/plans", element: <Plans /> },
  { path: "/recruiter/subscriptions", element: <Subscriptions /> },
  { path: "/recruiter/invoices", element: <Invoices /> },
  { path: "/recruiter/payments", element: <Payments /> },
  { path: "/recruiter/notifications", element: <Notifications /> },
  { path: "/recruiter/settings", element: <Settings /> },
  { path: "/recruiter/profile", element: <Profile /> },
  { path: "/recruiter/edit-profile", element: <EditProfile /> },
  { path: "/recruiter/help-center", element: <HelpCenter /> },
  { path: "/recruiter/feedback", element: <Feedback /> },
  { path: "/recruiter/schedule", element: <Schedule /> },
  { path: "/recruiter/candidates", element: <Candidates /> },
  { path: "/recruiter/job-seekers", element: <JobSeekers /> }, 
  { path: "/recruiter/jobseeker/:id", element: <JobSeekerProfile /> }, 
  { path: "/recruiter/project-details/:id", element: <ProjectDetails /> }, 
];

export default recruiterRoutes;
