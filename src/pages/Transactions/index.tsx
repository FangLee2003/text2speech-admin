import React from "react";
import { Link } from "react-router-dom";

const Transactions = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transactions</h2>
      <div className="flex gap-4">
        <Link to="/transactions/pending" className="bg-blue-600 text-white py-2 px-4 rounded">
          Pending Transactions
        </Link>
        <Link to="/transactions/history" className="bg-blue-600 text-white py-2 px-4 rounded">
          Transaction History
        </Link>
      </div>
    </div>
  );
};

export default Transactions;
