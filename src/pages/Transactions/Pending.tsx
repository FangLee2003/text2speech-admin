import React, { useState, useEffect } from "react";
import { getTransactions } from "@/services/api";
import Table from "@/components/Table";
import { Transaction } from "@/types/Transaction"; // Import Transaction interface

const PendingTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsData = await getTransactions();
      const pendingTransactions = transactionsData.filter(t => t.status === "pending");
      setTransactions(pendingTransactions);
    };
    fetchTransactions();
  }, []);

  const handleAccept = (id: number) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, status: "approved" } : t))
    );
  };

  const handleReject = (id: number) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, status: "rejected" } : t))
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pending Transactions</h2>
      <Table<Transaction>  // Sử dụng kiểu Transaction cho Table
        headers={['User', 'Amount', 'Status']}
        data={transactions}
        actions={[
          { label: "Accept", color: "bg-emerald-400 text-white hover:bg-emerald-500", onAction: handleAccept },
          { label: "Reject", color: "bg-rose-600 text-white hover:bg-rose-700", onAction: handleReject }
        ]}
      />
    </div>
  );
};

export default PendingTransactions;
