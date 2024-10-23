import { useState, useEffect } from "react";
import axios from "axios";

// components
import BalanceSheet from "./BalanceSheet";
import TransactionForm from "./TransactionForm";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/budgets");
      setTransactions(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // date formater
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <TransactionForm />
        <BalanceSheet />
        <h2 className="mt-5">Transaction List</h2>

        <ul className="list-group mt-3 mb-5">
          {transactions.map((transaction, index) => (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                transaction.type === "income"
                  ? "list-group-item-primary"
                  : "list-group-item-warning"
              }`}
            >
              <div>
                <strong>{transaction.category}</strong>, ${transaction.amount} (
                {transaction.type})
              </div>
              <span className="badge bg-secondary rounded-pill">
                {formatDate(transaction.date)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TransactionList;
