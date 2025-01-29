import ErrorToast from "@/components/toasts/error";
import { useAuth } from "@/context/AuthContext";
import { resendVerification, verifyEmail } from "@/services/api/api";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import SuccessToast from "@/components/toasts/success";
import { PulseLoader } from "react-spinners";

function VerifyEmail() {
  const { refresh } = useAuth();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Submit when all digits are entered
    if (index === 5 && value) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus last filled input or first empty input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();

    if (pastedData.length === 6) {
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (otpValue) => {
    try {
      const response = await verifyEmail(otpValue);
      if (response.data.status) {
        console.log(response.data)
        sessionStorage.removeItem('pendingVerificationEmail');
        await refresh();
        navigate("/jobseeker/introduction/profile");
      } else {
        ErrorToast("Invalid or expired verification link.");
      }
    } catch (err) {
      ErrorToast(err.response?.data || err.message || "Verification failed, please try again.");
    }
  };

  const resendToken = async () => {
    try {
      setLoading(true);
      const email = sessionStorage.getItem('pendingVerificationEmail');
      const data = new FormData;
      data.append('email', email)
      await resendVerification(data);
      SuccessToast('Code has been resend to your email!')
      setLoading(false);
    } catch (err) {
      console.log(err)
      ErrorToast("Failed to resend, please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#2b4033]">
            Enter Verification Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            We've sent a 6-digit code to your email
          </p>
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 border-2 rounded-lg text-center text-2xl font-bold 
                          focus:border-[#abd2ab] focus:ring-2 focus:ring-[#bccfbc]
                          outline-none transition-all"
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            The code will be automatically submitted once all digits are entered
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              onClick={resendToken}
              className="text-[#81cc81] hover:text-[#73ad73]"
            >
              {loading ? <PulseLoader size={8} color="#81cc81" /> : "Resend Code"}


            </Button>
            {/* {isResendDisabled && (
                <span className="text-sm text-gray-500">
                  ({formatTime(countdown)})
                </span>
              )} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyEmail;