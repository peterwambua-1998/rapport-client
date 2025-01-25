import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";
import { getProfileMs, getSeekerProfile } from '@/services/api/api';

const RequireProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await getSeekerProfile();
      if (!response.data) {
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
