import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "@/services/api/api";
import logo from '@/assets/images/logo.png'
import HeaderNav from "../header/header";

function ResetPassword() {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      await resetPassword(token, formData.password);
      setIsSuccess(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!token) {
    return (
      <div>
        <HeaderNav />
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-0">
          <div className="w-full max-w-md mb-6 p-8 space-y-8 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold text-center">
              Invalid Reset Link
            </h2>
            <p className="text-center text-gray-600">
              This password reset link is invalid or has expired.
            </p>
            <Link
              to="/admin/forgot-password"
              className="text-blue-600 hover:text-blue-500"
            >
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between bg-white items-center h-14 px-6 py-2 border-b shadow-md">
        <Link to="/" style={{ height: '100%', width: '10%' }}>
          <img src={logo} alt="logo" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
        </Link>
        <div className="flex space-x-4">
        </div>
      </header>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-0">
        <div className="w-full max-w-md mb-6 p-8 space-y-8 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p className="text-center text-gray-600">
            {!isSuccess
              ? "Choose a new password for your account"
              : "Your password has been reset"}
          </p>
          {error && <p className="text-center text-red-500">{error}</p>}


          {!isSuccess ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Your password has been successfully reset.
              </p>
              <Link
                to="/admin/login"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Return to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
