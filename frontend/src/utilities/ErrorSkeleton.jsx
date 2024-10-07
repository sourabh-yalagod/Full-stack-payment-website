import React from "react";
import { useNavigate } from "react-router-dom";
const ErrorSkeleton = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full px-5 flex flex-col justify-center items-center space-y-6">
      <div className="w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-full shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600">
          We couldn't load the data. Please try again later.
        </p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="bg-red-500 px-2 py-1 rounded-lg text-white"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorSkeleton;
