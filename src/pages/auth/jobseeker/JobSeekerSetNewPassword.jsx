import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { setNewPassword } from "@/services/api/api";
import logo from '@/assets/images/logo.png';
import { PasswordStrength } from "@/components/common/auth/PasswordStrength";
import HeaderNav from "../header/header";

function SetNewPassword() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      await setNewPassword(id, formData.password);
      setIsSuccess(true);
      navigate("/jobseeker/login");
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

  return (
    <div>
            <HeaderNav />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-0">
        <div className="w-full max-w-md mb-6 p-8 space-y-8 bg-white rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-center">Set New Password</h2>
          <p className="text-center text-gray-600">
            {!isSuccess
              ? "Please set a new password for your account"
              : "Your password has been successfully set"}
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
              <PasswordStrength password={formData.password} setIsValid={setIsValid} />
              <div>
                <button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? "Setting..." : "Set Password"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Your password has been successfully set.
              </p>
              <Link
                to="/jobseeker/login"
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

export default SetNewPassword;
