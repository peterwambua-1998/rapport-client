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
      let isValid = validateIntro(res.data.profileInfo)
      if (isValid == false) {
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

const validateIntro = (info) => {
  const requiredFields = [
    'AboutMe', 'ProfessionalTitle', 'Location', 'Industry',
    'YearsofExperience', 'CurrentRole', 'Company', 'Skills', 'videoUrl',
    'Company', 'Education', 'WorkExperience', 'videoUrl'
  ];

  let checkForValue = false;
  requiredFields.forEach(value => {
    if (info[value].length > 0 || info[value]) {
      checkForValue = true;
    } else {
      checkForValue = false;
    }
  })

  return checkForValue;
}
