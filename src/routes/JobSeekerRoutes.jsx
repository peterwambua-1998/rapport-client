import React from "react";
import Dashboard from "../pages/jobseeker/Dashboard";
import Notifications from "../pages/jobseeker/Notifications";
import Settings from "../pages/jobseeker/Settings";
import Profile from "../pages/jobseeker/Profile";
import VideoLibrary from "../pages/jobseeker/VideoLibrary";
import JobMatches from "../pages/jobseeker/JobMatches";
import Messages from "../pages/jobseeker/Messages";
import Schedule from "../pages/jobseeker/Schedule";
import HelpCenter from "../components/common/Help/HelpCenter";
import InterviewPrep from "../pages/jobseeker/InterviewPrep";
import Questions from "../pages/jobseeker/Questions";
import EditProfile from "@/pages/jobseeker/EditProfile";
import VerifyEmail from "@/pages/auth/jobseeker/JobSeekerVerifyEmail";

const jobseekerRoutes = [
  { path: "/jobseeker/dashboard", element: <Dashboard /> },
  { path: "/jobseeker/video-library", element: <VideoLibrary /> },
  { path: "/jobseeker/interview-prep", element: <InterviewPrep /> },
  { path: "/jobseeker/questions", element: <Questions /> },
  { path: "/jobseeker/job-matches", element: <JobMatches /> },
  { path: "/jobseeker/messages", element: <Messages /> },
  { path: "/jobseeker/schedule", element: <Schedule /> },
  { path: "/jobseeker/notifications", element: <Notifications /> },
  { path: "/jobseeker/settings", element: <Settings /> },
  { path: "/jobseeker/profile", element: <EditProfile /> },
  { path: "/jobseeker/help-center", element: <HelpCenter /> },
];

export default jobseekerRoutes;