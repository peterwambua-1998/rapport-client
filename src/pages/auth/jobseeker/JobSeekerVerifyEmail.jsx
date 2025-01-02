import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { verifyEmail } from "@/services/api/api";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [status, setStatus] = useState({
    isLoading: true,
    isSuccess: false,
    error: "",
  });

  useEffect(() => {
    const verifyJobseekerEmail = async () => {
      try {
        const response = await verifyEmail(token);
        if (response.data.success) {
          console.log(response.data)
          navigate(`/jobseeker/set-password/${response.data.user.id}`);
          setStatus({ isLoading: false, isSuccess: true, error: "" });
        } else {
          throw new Error("Invalid or expired verification link.");
        }
      } catch (err) {
        setStatus({
          isLoading: false,
          isSuccess: false,
          error: err.response?.data?.message || err.message || "Verification failed. Please try again.",
        });
      }
    };

    verifyJobseekerEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 mb-6 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Email Verification</h2>
        {status.isLoading ? (
          <p className="text-center text-gray-600">Verifying your email...</p>
        ) : status.isSuccess ? (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Your email has been successfully verified.</p>
            <Link
              to="/jobseeker/login"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-red-500 mb-4">{status.error}</p>
            {/* <Link
              to="/jobseeker/resend-verification"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Resend Verification Email
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
