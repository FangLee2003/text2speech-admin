import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-black">
      {/* Sidebar */}
      <div className="w-64 bg-white text-gray-800 shadow-lg">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
