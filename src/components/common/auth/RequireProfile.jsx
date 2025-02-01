import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";
import { getProfileMs, getSeekerProfile } from '@/services/api/api';

const RequireProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {

      const res = await getSeekerProfile();
      let isValid = await validateIntro(res.data.profileInfo)
      console.log(isValid);
      if (isValid.isValid == false) {
        navigate('/jobseeker/introduction/profile');
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (user && user?.role == "job_seeker") {
      fetchProfile();
    }
  }, [user, navigate]);

  return null;
};

export default RequireProfile;

const validateIntro = async (profileInfo) => {
  const requiredFields = [
    'AboutMe', 'ProfessionalTitle', 'Location', 'Industry', 
    'YearsofExperience', 'CurrentRole', 'Company', 'Skills', 'videoUrl', 'CurrentRole',
    'Company', 'Education', 'WorkExperience',
  ];

  const missingFields = requiredFields.filter(field => 
    !profileInfo[field] || profileInfo[field] === '' || profileInfo[field].length == 0
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      missingFields,
      message: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  return {
    isValid: true,
    missingFields: null,
    message: 'Profile is valid'
  };
}