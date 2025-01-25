import bannerOne from '@/assets/images/banner-1.webp'
import { PasswordStrength } from '@/components/common/auth/PasswordStrength';
import ErrorToast from '@/components/toasts/error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import { linkedInLogin, registerJobSeeker } from '@/services/api/api';
import { useState } from 'react';
import { FaLinkedin, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const RegisterJobSeekerPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fName: "",
    mName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fName: false,
    lName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "") {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fName: formData.fName === "",
      lName: formData.lName === "",
      email: formData.email === "",
      phone: formData.phone === "",
      password: formData.password === "",
      confirmPassword: formData.confirmPassword === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      
      if (validateForm()) {

        if (formData.password !== formData.confirmPassword) {
          ErrorToast("Passwords do not match");
          setLoading(false)
          return;
        }

        setLoading(true);
        const res = await registerJobSeeker(formData);
        sessionStorage.setItem('pendingVerificationEmail', formData.email);
        navigate('/jobseeker/verify');
      }
    } catch (error) {
      ErrorToast(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      linkedInLogin("job_seeker");
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cPasswordVisible);
  };

  return (
    <div className='min-h-screen bg-white'>
      <div className='grid lg:grid-cols-2 md:grid-cols-1'>
        {/* Banner image - hidden on mobile */}
        <div
          className='hidden md:block bg-cover bg-no-repeat bg-center min-h-screen'
          style={{ backgroundImage: `url('${bannerOne}')` }}
        />

        {/* Registration form container */}
        <div className='flex items-center justify-center p-4 min-h-screen'>
          <div className='w-full max-w-2xl bg-[#c3dac4] p-6 rounded-lg mx-4'>
            <div className='prose w-full max-w-none'>
              <h3 className='text-xl font-bold text-center mb-6'>Sign up</h3>

              {/* LinkedIn button */}
              <button
                onClick={handleLinkedInLogin}
                className="w-full py-3 px-4 text-white bg-[#346ef1] rounded-lg hover:bg-[#005682] flex items-center justify-center space-x-2 transition-colors"
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

              {/* Registration form */}
              <form onSubmit={submitData} className="space-y-4 not-prose">
                {/* Name fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      type="text"
                      name="fName"
                      defaultValue={''}
                      onChange={handleChange}
                      className="w-full mt-1 bg-white border-slate-400 rounded-lg"
                    />
                    {errors.fName && (
                      <p className="mt-1 text-red-500 text-sm">First name is required.</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="middleName" className="text-sm font-medium">Middle Name (optional)</Label>
                    <Input
                      id="middleName"
                      placeholder="Enter middle name"
                      type="text"
                      name="mName"
                      defaultValue={''}
                      onChange={handleChange}
                      className="w-full mt-1 bg-white border-slate-400 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="lName"
                      placeholder="Enter last name"
                      type="text"
                      name="lName"
                      defaultValue={''}
                      onChange={handleChange}
                      className="w-full mt-1 bg-white border-slate-400 rounded-lg"
                    />
                    {errors.lName && (
                      <p className="mt-1 text-red-500 text-sm">Last name is required.</p>
                    )}
                  </div>
                </div>

                {/* Contact information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      defaultValue={''}
                      onChange={handleChange}
                      className="w-full mt-1 bg-white border-slate-400 rounded-lg"
                      placeholder="Enter email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-sm">Email is required.</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      defaultValue={''}
                      onChange={handleChange}
                      className="w-full mt-1 bg-white border-slate-400 rounded-lg"
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-red-500 text-sm">Phone number is required.</p>
                    )}
                  </div>
                </div>

                {/* Password field with toggle */}
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      defaultValue={formData.password}
                      onChange={handleChange}
                      className="w-full mt-1 bg-white border-slate-400 rounded-lg pr-10"
                      placeholder="Enter password"
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
                    <p className="mt-1 text-red-500 text-sm">Password is required.</p>
                  )}
                </div>


                <div>
                  <Label htmlFor="password" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={cPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      defaultValue={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full mt-1 bg-white border-slate-400 rounded-lg pr-10"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={toggleCPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {cPasswordVisible ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-red-500 text-sm">Confirm your password.</p>
                  )}
                </div>

                <PasswordStrength password={formData.password} setIsValid={setIsValid} />

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#2b4033] hover:bg-[#1e3728] text-white rounded-lg transition-colors"
                >
                  {loading ? <PulseLoader size={8} color="#ffffff" /> : "Sign Up"}
                </Button>

                {/* Sign in link */}
                <p className='text-sm text-center'>
                  Already have an account?{' '}
                  <a
                    href="#"
                    className='text-[#2b4033] hover:text-[#1e3728] font-bold transition-colors'
                    onClick={() => navigate('/jobseeker/login')}
                  >
                    Sign in
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

export default RegisterJobSeekerPage;