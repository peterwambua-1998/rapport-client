import React, { createContext, useState, useContext, useEffect } from 'react';
import defaultProfilePhoto from '@/assets/images/dummyImg.png'
import { getProfile } from '@/services/api/api';
import { getImageUrl } from '@/services/helpers/helpers';

const UserProfileContext = createContext();

export const UserProfileProvider =  ({ children }) => {
  const [photo, setPhoto] = useState(defaultProfilePhoto);

  const updatePhoto = (newPhoto) => {
    setPhoto(newPhoto);
  };

  useEffect(() => {
    const fetchProfile = async () => {
          try {
            const response = await getProfile();
            if (response.data.avatar) {
              updatePhoto(getImageUrl((response.data.avatar)))
            }
          } catch (err) {
            console.log(err);
          }
        };
        fetchProfile();
  }, []); 

  return (
    <UserProfileContext.Provider value={{ photo, updatePhoto }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
