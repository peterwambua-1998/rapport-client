import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from '@/assets/images/logo.png'
import HeaderNav from "../header/header";

const AdminLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message?.message || "An error occurred during login."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <HeaderNav />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-0">
        <div className="w-full max-w-md mb-6 p-8 space-y-8 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-gray-600">Sign in to your account</p>
          {error && <p className="text-center text-red-500">{error}</p>}
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
                  href="/admin/forgot-password"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default AdminLogin;
