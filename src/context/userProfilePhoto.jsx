import React, { createContext, useState, useContext } from 'react';
import defaultProfilePhoto from '@/assets/images/dummyImg.png'

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [photo, setPhoto] = useState(defaultProfilePhoto);

  const updatePhoto = (newPhoto) => {
    setPhoto(newPhoto);
  };

  return (
    <UserProfileContext.Provider value={{ photo, updatePhoto }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
