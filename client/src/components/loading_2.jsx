import React from 'react';
import { FiActivity } from 'react-icons/fi';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="relative">
          <FiActivity className="w-12 h-12 text-primary-600 mx-auto animate-bounce" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-primary-200 rounded-full animate-pulse"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
