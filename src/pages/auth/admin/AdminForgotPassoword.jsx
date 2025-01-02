import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "@/services/api/api";
import logo from '@/assets/images/logo.png'
import HeaderNav from "../header/header";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await forgotPassword({ role: "admin", email });
      setIsSubmitted(true);
    } catch (err) {
      console.log(err.response.data.error);
      console.error("Password reset request failed:", err);
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

  return (
    <div>
      <HeaderNav />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-0">
        <div className="w-full max-w-md mb-6 p-8 space-y-8 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p className="text-center text-gray-600">
            {!isSubmitted
              ? "Enter your email to reset your password"
              : "Check your email for reset instructions"}
          </p>
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              {error && ( // Conditionally render error message
                <div className="text-red-500 mt-2 text-sm">{error}</div>
              )}
              {/* Success message (inline example) */}
              {!error && !isLoading && email && (
                <div className="text-green-500 mt-2 text-sm">
                  A reset link has been sent to {email}. You will receive
                  password reset instructions.
                </div>
              )}
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/admin/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
