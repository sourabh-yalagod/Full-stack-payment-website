import React from "react";

const PendingSkeleton = () => {
  return (
    <div className="min-h-screen w-full px-5 flex flex-col justify-center items-center space-y-6 animate-pulse">
      <div className="w-3/4 h-8 bg-gray-300 rounded-md"></div>
      <div className="w-full max-w-lg p-5 bg-gray-100 rounded-lg shadow-lg">
        <div className="w-1/2 h-6 bg-gray-300 rounded-md mb-4"></div>
        <div className="space-y-4">
          <div className="w-full h-10 bg-gray-300 rounded-md"></div>
          <div className="w-full h-10 bg-gray-300 rounded-md"></div>
          <div className="w-full h-10 bg-gray-300 rounded-md"></div>
          <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-full h-10 bg-gray-300 rounded-md mt-6"></div>
        <div className="w-1/2 h-12 bg-gray-300 rounded-md mt-8 mx-auto"></div>
      </div>
    </div>
  );
};

export default PendingSkeleton;
