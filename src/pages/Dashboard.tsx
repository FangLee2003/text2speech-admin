import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="">
      <h2 className="text-2xl text-black font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold">Total Plans</h3>
          <p className="text-blue-600">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-blue-600">120</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold">Total Transactions</h3>
          <p className="text-blue-600">30</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
