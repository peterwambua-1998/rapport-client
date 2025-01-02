import React from "react";

const HelpCenter = () => {
  return (
    <div>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Help Center</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <h1 className="text-2xl font-semibold">Help Center Content</h1>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
