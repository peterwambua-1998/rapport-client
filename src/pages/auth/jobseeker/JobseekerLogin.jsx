import React, { useState } from "react";
import { FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { linkedInLogin } from "../../../services/api/api";
import logo from '@/assets/images/logo.png';
import { PulseLoader } from "react-spinners";
import ErrorToast from "@/components/toasts/error";
import HeaderNav from "../header/header";

const JobseekerLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "job_seeker",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);
      navigate("/jobseeker/dashboard");
    } catch (err) {
      const error = err.response.data.message;
      if (error?.needsPasswordSetup) {
        navigate(`/jobseeker/set-password/${error.user.id}`);
        ErrorToast("Please set your password to login.");

      }
      setLoading(false)
    }
  };

  const handleLinkedInLogin = async () => {
    await linkedInLogin("job_seeker");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
            <HeaderNav />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-0">
        <div className="w-full max-w-md p-8 mb-6 space-y-8 bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-gray-600">Sign in to your account</p>
          {error && <p className="text-center text-red-500">{error}</p>}
          <button
            onClick={handleLinkedInLogin}
            className="w-full py-2 mt-4 text-white bg-[#0077B5] rounded hover:bg-[#005682] flex items-center justify-center space-x-2"
          >
            <FaLinkedin />
            <span>Sign in with LinkedIn</span>
          </button>
          <div className="flex items-center justify-center mt-4">
            <span className="w-1/5 border-b"></span>
            <span className="px-3 text-sm text-gray-500">Or continue with</span>
            <span className="w-1/5 border-b"></span>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="text-gray-500" size={20} />
                  ) : (
                    <FaEye className="text-gray-500" size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/jobseeker/forgot-password"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-[#4a90e2] rounded hover:bg-[#4a90e2]"
              onClick={() => setLoading(true)}
            >
            {loading ? <PulseLoader size={8} color="#ffffff" /> : "Sign in"}
              
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-500"
              onClick={() => navigate('/jobseeker/register')}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>

  );
};

export default JobseekerLogin;
