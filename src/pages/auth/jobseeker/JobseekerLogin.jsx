import React, { useState } from "react";
import { FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { linkedInLogin } from "../../../services/api/api";
import { PulseLoader } from "react-spinners";
import ErrorToast from "@/components/toasts/error";
import bannerOne from '@/assets/images/banner-1.webp'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const JobseekerLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "job_seeker",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    if (error[name]) {
      setError(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const input = e.target;
    if (!input.validity.valid) {
      setErrors(prev => ({
        ...prev,
        [input.name]: input.validationMessage
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[input.name];
        return newErrors;
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const inputs = Array.from(form.elements);
    const newErrors = {};
    inputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        if (!input.validity.valid) {
          newErrors[input.name] = input.validationMessage;
        }
      }
    });

    setErrors(newErrors);

    if (!form.checkValidity()) {
      return;
    }

    setLoading(true);

    try {
      const data = await login(credentials);
      navigate("/jobseeker/dashboard");
    } catch (err) {
      ErrorToast(err.response?.data?.message?.message ?? "An error occurred during login.")
      setLoading(false);
    }
  };

  const handleLinkedInLogin = async () => {
    await linkedInLogin("job_seeker");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Main container with responsive grid */}
      <div className='grid lg:grid-cols-2 md:grid-cols-1'>
        {/* Banner image - hidden on small screens */}
        <div
          className='hidden md:block bg-cover bg-no-repeat bg-center min-h-screen'
          style={{ backgroundImage: `url('${bannerOne}')` }}
        ></div>

        {/* Login form container */}
        <div className='flex items-center justify-center p-4 min-h-screen'>
          <div className='w-full max-w-md bg-[#c3dac4] p-6 rounded-lg mx-auto'>
            <div className='prose w-full max-w-none'>
              <h3 className='text-2xl font-bold text-center mb-6'>Sign in</h3>

              {/* LinkedIn button */}
              <button
                onClick={handleLinkedInLogin}
                className="w-full py-2.5 px-4 text-white bg-[#346ef1] rounded-lg hover:bg-[#005682] flex items-center justify-center space-x-2 transition-colors"
              >
                <FaLinkedin className="text-xl" />
                <span>Sign in with LinkedIn</span>
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center my-6">
                <span className="w-full border-b border-slate-400"></span>
                <span className="px-4 text-sm text-gray-500 bg-[#c3dac4]">or</span>
                <span className="w-full border-b border-slate-400"></span>
              </div>

              {/* Login form */}
              <form onSubmit={handleLogin} noValidate className="space-y-5 not-prose">
                {/* Email field */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={credentials.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter email"
                    className={`w-full border-slate-400 px-3 py-2 mt-1 text-sm border rounded-lg `}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password field */}
                <div className="relative">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      defaultValue={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className={`w-full px-3 border-slate-400 py-2 text-sm border rounded-l`}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {passwordVisible ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-[#2b4033] hover:bg-[#1e3728] text-white rounded-lg transition-colors"
                >
                  {loading ? <PulseLoader size={8} color="#ffffff" /> : "Sign In"}
                </Button>

                {/* Sign up link */}
                <p className='text-sm text-center'>
                  Don't have an account?{' '}
                  <a
                    href="#"
                    className='text-[#2b4033] hover:text-[#1e3728] font-bold transition-colors'
                    onClick={() => navigate('/jobseeker/register')}
                  >
                    Sign up
                  </a>
                </p>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerLogin;