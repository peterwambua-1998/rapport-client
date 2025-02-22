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

const RegisterRecruiterPage = () => {

  const [errors, setErrors] = useState({
    fName: false,
    lName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const handleLinkedInLogin = async () => {
    try {
      linkedInLogin("job_seeker");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "") {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {


    } catch (error) {
      ErrorToast(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      <div className='grid lg:grid-cols-2 md:grid-cols-1'>
        <div
          className='hidden md:block bg-cover bg-no-repeat bg-center min-h-screen'
          style={{ backgroundImage: `url('${bannerOne}')` }}
        />
        <div className='p-4 min-h-screen'>
          <div className='p-4 '>
            <div className='w-full max-w-2xl bg-[#c3dac4] p-6 rounded-lg mx-4'>
              <div>
                <h3 className='text-xl font-bold text-center mb-6'>Sign up</h3>

                <button
                  onClick={handleLinkedInLogin}
                  className="w-full py-3 px-4 text-white bg-[#0A66C2] rounded-lg hover:bg-[#005682] flex items-center justify-center space-x-2 transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                  <span>Sign in with LinkedIn</span>
                </button>

                <div className="flex items-center justify-center my-6">
                  <span className="w-full border-b border-slate-400"></span>
                  <span className="px-4 text-sm text-gray-500 bg-[#c3dac4]">or</span>
                  <span className="w-full border-b border-slate-400"></span>
                </div>

                <form onSubmit={submitData} className="space-y-4 not-prose">

                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
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

                  <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4'>
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
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterRecruiterPage;