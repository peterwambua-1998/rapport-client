import React, { useState } from "react";
import { changePassword } from "@/services/api/api";
import { PasswordStrength } from "@/components/common/auth/PasswordStrength";

const Password = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { currentPassword, newPassword, retypeNewPassword } = formData;
    if (!currentPassword || !newPassword || !retypeNewPassword) {
      return "All fields are required.";
    }
    if (newPassword !== retypeNewPassword) {
      return "New password and re-typed password do not match.";
    }
    if (newPassword.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await changePassword(formData);
      if (response.data.success) {
        setSuccess("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          retypeNewPassword: "",
        });
      } else {
        setError(response.message || "Failed to change password.");
      }
    } catch (err) {
      setError("An error occurred while changing the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Re-type New Password
          </label>
          <input
            type="password"
            name="retypeNewPassword"
            value={formData.retypeNewPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <PasswordStrength password={formData.newPassword} setIsValid={setIsValid} />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={loading || !isValid}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default Password;
