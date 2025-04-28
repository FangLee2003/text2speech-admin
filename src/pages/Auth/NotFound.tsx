import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
        <p className="text-lg mb-6">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-blue-600 text-white py-2 px-4 rounded">Go Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
