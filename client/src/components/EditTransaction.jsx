import { useState, useEffect } from "react";
import axios from "axios";

// components
import Button from "./Button";

function EditTransaction({ transaction }) {
  const [editTransaction, setEditTransaction] = useState({
    amount: transaction.amount,
    category: transaction.category,
    type: transaction.type,
    date: transaction.date
      ? new Date(transaction.date).toISOString().split("T")[0]
      : "", // Format date
  });

  const handleEditTransaction = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.put(
        `http://localhost:5000/budget/${transaction.id}`,
        editTransaction,
        { headers: { "Content-Type": "application/json" } }
      );
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert amount to number only if the input is not empty
    const updatedValue =
      name === "amount" ? (value === "" ? "" : Number(value)) : value;

    setEditTransaction((prevEditTransaction) => ({
      ...prevEditTransaction,
      [name]: updatedValue,
    }));
  };

  useEffect(() => {
    const modalElement = document.getElementById(`id${transaction.id}`);
    const handleModalClose = () => {
      // Reset the form state to the initial values when the modal is closed
      setEditTransaction({
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type,
        date: transaction.date
          ? new Date(transaction.date).toISOString().split("T")[0]
          : "",
      });
    };

    // Attach event listener for Bootstrap modal hidden event
    modalElement.addEventListener("hidden.bs.modal", handleModalClose);

    // Cleanup event listener on unmount
    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, [transaction]);

  return (
    <>
      <Button
        text="Edit"
        className="btn btn-outline-warning btn-sm me-2"
        dataBsToggle="modal"
        dataBsTarget={`#id${transaction.id}`}
      />

      <div className="modal" id={`id${transaction.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Transaction</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form className="mt-3" onSubmit={handleEditTransaction}>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Enter amount"
                    required
                    className="form-control"
                    onChange={handleChange}
                    value={editTransaction.amount}
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
                    value={editTransaction.category}
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
                    value={editTransaction.date}
                  />
                  <label htmlFor="category">Date:</label>
                </div>

                <select
                  name="type"
                  id="type"
                  className="form-select mt-3"
                  onChange={handleChange}
                  value={editTransaction.type}
                >
                  <option value="">Select type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <Button
                  text="Update"
                  className="btn btn-warning mt-3 form-control"
                />
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTransaction;
