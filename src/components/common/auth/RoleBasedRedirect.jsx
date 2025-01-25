import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

const RoleBasedRedirect = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  

  if (loading) {
    return (
      <div className="col-span-full text-center">
        <LoadingSpinner message="Loading" />
      </div>);
  }
  console.log('role based')
  if (user) {
    if (user?.role) {
      switch (user?.role) {
        case "admin":
          return <Navigate to="/admin/dashboard" replace />;
        case "job_seeker":
          return <Navigate to="/jobseeker/dashboard" replace />;
        case "recruiter":
          return <Navigate to="/recruiter/dashboard" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
  }
  return children
};

export default RoleBasedRedirect;
