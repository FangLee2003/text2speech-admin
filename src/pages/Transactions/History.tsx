import React, { useState, useEffect } from "react";
import { getTransactions } from "@/services/api";
import Table from "@/components/Table";
import { Transaction } from "@/types/Transaction"; // Import Transaction interface

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsData = await getTransactions();
      const completedTransactions = transactionsData.filter((t: Transaction) => t.status !== "pending");
      setTransactions(completedTransactions);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
      <Table
        headers={['User', 'Amount', 'Status']}
        data={transactions}
        actions={[]}
      />
    </div>
  );
};

export default TransactionHistory;
