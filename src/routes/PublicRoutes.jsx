import React from "react";
import Home from "../pages/public/Home";
import Pricing from "../pages/public/Pricing";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Recruiters from "../pages/public/Recruiters";
import Jobseekers from "../pages/public/Jobseekers";

import AdminLogin from "../pages/auth/admin/AdminLogin";
import AdminForgotPassoword from "../pages/auth/admin/AdminForgotPassoword";
import AdminResetPassword from "../pages/auth/admin/AdminResetPassword";

import RegisterJobSeeker from "../pages/auth/jobseeker/RegisterJobSeeker";
import JobseekerLogin from "../pages/auth/jobseeker/JobseekerLogin";
import JobSeekerForgotPassoword from "../pages/auth/jobseeker/JobSeekerForgotPassoword";
import JobSeekerResetPassword from "../pages/auth/jobseeker/JobSeekerResetPassword";
import JobSeekerVerifyEmail from "../pages/auth/jobseeker/JobSeekerVerifyEmail";

import RegisterRecruiter from "../pages/auth/recruiter/RegisterRecruiter";
import RecruiterLogin from "../pages/auth/recruiter/RecruiterLogin";
import RecruiterForgotPassoword from "../pages/auth/recruiter/RecruiterForgotPassoword";
import RecruiterResetPassword from "../pages/auth/recruiter/RecruiterResetPassword";
import RecruiterVerifyEmail from "../pages/auth/recruiter/RecruiterVerifyEmail";
import SetNewPassword from "@/pages/auth/jobseeker/JobSeekerSetNewPassword";

const PublicRoutes = [
  { path: "/", element: <Home />, key: "home" },
  { path: "/pricing", element: <Pricing />, key: "pricing" },
  { path: "/about", element: <About />, key: "about" },
  { path: "/contact", element: <Contact />, key: "contact" },
  { path: "/recruiters", element: <Recruiters />, key: "recruiters" },
  { path: "/job-seekers", element: <Jobseekers />, key: "jobseekers" },

  {
    path: "/jobseeker/register",
    element: <RegisterJobSeeker />,
    key: "signup-job-seeker",
  },
  {
    path: "/jobseeker/login",
    element: <JobseekerLogin />,
    key: "jobseeker-login",
  },
  {
    path: "/jobseeker/forgot-password",
    element: <JobSeekerForgotPassoword />,
    key: "jobseeker-login",
  },
  {
    path: "/jobseeker/reset-password/:token",
    element: <JobSeekerResetPassword />,
    key: "jobseeker-login",
  },
  {
    path: "/jobseeker/set-password/:id",
    element: <SetNewPassword />,
    key: "jobseeker-login",
  },
  {
    path: "/jobseeker/verify/:token",
    element: <JobSeekerVerifyEmail />,
    key: "jobseeker-login",
  },

  { path: "/admin/login", element: <AdminLogin />, key: "admin-login" },
  {
    path: "/admin/forgot-password",
    element: <AdminForgotPassoword />,
    key: "admin-login",
  },
  {
    path: "/admin/reset-password/:token",
    element: <AdminResetPassword />,
    key: "admin-login",
  },
  {
    path: "/recruiter/register",
    element: <RegisterRecruiter />,
    key: "signup-recruiter",
  },
  {
    path: "/recruiter/login",
    element: <RecruiterLogin />,
    key: "recruiter-login",
  },
  {
    path: "/recruiter/forgot-password",
    element: <RecruiterForgotPassoword />,
    key: "recruiter-login",
  },
  {
    path: "/recruiter/reset-password/:token",
    element: <RecruiterResetPassword />,
    key: "recruiter-login",
  },
  {
    path: "/recruiter/verify-email",
    element: <RecruiterVerifyEmail />,
    key: "recruiter-login",
  },
];

export default PublicRoutes;
