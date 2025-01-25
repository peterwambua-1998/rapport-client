import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PublicRoutes from "./routes/PublicRoutes";
import RecruiterRoutes from "./routes/RecruiterRoutes";
import JobSeekerRoutes from "./routes/JobSeekerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./components/common/auth/ProtectedRoute";
import RoleBasedRedirect from "./components/common/auth/RoleBasedRedirect";
import RequireProfile from "./components/common/auth/RequireProfile";
import { Toaster } from "@/components/ui/toaster"
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import { UserProfileProvider } from "./context/userProfilePhoto";
import IntroductionProfile from "./pages/auth/jobseeker/Profile";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="col-span-full text-center">
        <LoadingSpinner message="" />
      </div>);
  }

  return (
    <Router>
      <Toaster />
      <RequireProfile />
      <Routes>
        {/* Public Routes with PublicLayout */}
        <Route element={<PublicLayout />}>
          {PublicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <RoleBasedRedirect>
                  {route.element}
                </RoleBasedRedirect>
              }
            />
          ))}
        </Route>

        {/* JobSeeker Routes with MainLayout */}
        <Route element={<MainLayout />}>
          {JobSeekerRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="job_seeker">
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}
          {/* { path: , element:  }, */}
        </Route>
        <Route
            path="/jobseeker/introduction/profile"
            element={
              <ProtectedRoute role="job_seeker">
               <IntroductionProfile />
              </ProtectedRoute>
            }
          />

        {/* Recruiter Routes with MainLayout */}
        <Route element={<MainLayout />}>
          {RecruiterRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="recruiter">
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}
          
        </Route>

        {/* Admin Routes with MainLayout */}
        <Route element={<MainLayout />}>
          {AdminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role="admin">{route.element}</ProtectedRoute>
              }
            />
          ))}
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<RoleBasedRedirect />} />
      </Routes>
    </Router>
  );
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default AppWithAuth;
