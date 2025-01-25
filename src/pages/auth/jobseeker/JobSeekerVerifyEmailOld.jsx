import ErrorToast from "@/components/toasts/error";
import { useAuth } from "@/context/AuthContext";
import { verifyEmail } from "@/services/api/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainComponent({ isOpen, onClose, verifyJobseekerEmail }) {
  const [verificationCode, setVerificationCode] = React.useState("");
  
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-roboto mb-4">Verify Your Address</h2>
            <p className="font-roboto mb-6">
              Enter the verification code sent to your mailing address:
            </p>
            <input
              type="text"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter verification code"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-roboto"
              >
                Cancel
              </button>
              <button
                onClick={() => verifyJobseekerEmail(verificationCode)}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded font-roboto"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VerifyEmail() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const {refresh} = useAuth();

  useEffect(() => {
    const email = sessionStorage.getItem('pendingVerificationEmail');
    if (!email) {
      navigate('/jobseeker/register');
    }
  }, []);

  const verifyJobseekerEmail = async (verificationCode) => {
    try {
      const response = await verifyEmail(verificationCode);
      console.log(response.data.status)
      if (response.data.status) {
        console.log(response.data)
        sessionStorage.removeItem('pendingVerificationEmail');
        refresh();
        navigate("/jobseeker/dashboard");
      } else {
        ErrorToast("Invalid or expired verification link.");
      }
    } catch (err) {
      console.log(err)
      ErrorToast(err.response?.data?.message || err.message || "Verification failed. Please try again.");
      navigate(`/jobseeker/register`);
    }
  };


  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-roboto"
      >
        Open Verification Modal
      </button>
      <MainComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        verifyJobseekerEmail={verifyJobseekerEmail}
      />
    </div>
  );
}

export default VerifyEmail;