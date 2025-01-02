import React from 'react';
import { FadeLoader } from "react-spinners";

const LoadingSpinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FadeLoader />
      <p>Loading {message}...</p>
    </div>
  );
};

export default LoadingSpinner;
