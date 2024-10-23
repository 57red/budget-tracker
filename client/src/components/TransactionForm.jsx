import axios from "axios";
import { useState } from "react";

// components
import Button from "./Button";

function TransactionForm() {
  const [transaction, setTransaction] = useState({
    amount: "",
    category: "",
    type: "income",
    date: "",
  });

  const addTransaction = async (e) => {
    e.preventDefault();
    console.log(transaction);
    try {
      const response = await axios.post(
        "http://localhost:5000/budget",
        transaction,
        { headers: { "Content-Type": "application/json" } }
      );
      window.location = "/";
    } catch (err) {
      console.error(
        "Error adding transaction:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    //  Convert amount to number only if the input is not empty
    const updatedValue =
      name === "amount" ? (value === "" ? "" : Number(value)) : value;

    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: updatedValue,
    }));
  };

  return (
    <>
      <div className="container mt-5 text-center">
        <h1>Transaction Form</h1>
        <form className="mt-3" onSubmit={addTransaction}>
          <div className="form-floating mb-3">
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              required
              className="form-control"
              onChange={handleChange}
              value={transaction.amount}
            />
            <label htmlFor="amount">Amount:</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter category"
              required
              className="form-control"
              onChange={handleChange}
              value={transaction.category}
            />
            <label htmlFor="category">Category:</label>
          </div>

          <div className="form-floating">
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Enter date"
              required
              className="form-control"
              onChange={handleChange}
              value={transaction.date}
            />
            <label htmlFor="category">Category:</label>
          </div>

          <select
            name="type"
            id="type"
            className="form-select mt-3"
            onChange={handleChange}
            value={transaction.type}
          >
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <Button text="Add" className="btn btn-success mt-3 form-control" />
        </form>
      </div>
    </>
  );
}

export default TransactionForm;
