import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";

const ProtectedRoute = ({ role, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="col-span-full text-center">
        <LoadingSpinner message="Loading" />
      </div>);
  }

  if (!isAuthenticated) {
    console.log('Not authenticated');
    return <Navigate to="/" replace />;
  }

  if (user?.role !== role) {
    console.log('Not role');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;