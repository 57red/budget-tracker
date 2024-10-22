const pool = require("../../database/database");

// create budget
exports.createBudget = async (req, res) => {
  try {
    const { amount, category, type, date } = req.body;
    const addBudget = await pool.query(
      "INSERT INTO transactions (amount, category, type, date) VALUES ($1, $2, $3, $4)",
      [amount, category, type, date]
    );
    res.status(201).json({
      message: "Budget created successfully",
      data: { amount, category, type, date },
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the budget." });
  }
};

// get all budget
exports.getAllBudget = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM transactions");
    res.status(201).json(response.rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while getting all the budget." });
  }
};

exports.updateBudget = async (req, res) => {
  const { id } = req.params; // Get the transaction id from the URL parameter
  const { amount, category, type, date } = req.body; // Get the potential update data from the request body

  // Initialize an array for the fields to be updated and their values
  const fields = [];
  const values = [];
  let query = "UPDATE transactions SET ";
  let counter = 1;

  // Check which fields are present and add them to the update query
  if (amount !== undefined) {
    fields.push(`amount = $${counter++}`);
    values.push(amount);
  }
  if (category !== undefined) {
    fields.push(`category = $${counter++}`);
    values.push(category);
  }
  if (type !== undefined) {
    fields.push(`type = $${counter++}`);
    values.push(type);
  }
  if (date !== undefined) {
    fields.push(`date = $${counter++}`);
    values.push(date);
  }

  // If no fields are provided, return a 400 Bad Request
  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields provided to update." });
  }

  // Join the fields and complete the query
  query += fields.join(", ");
  query += ` WHERE id = $${counter}`; // Add the WHERE clause
  values.push(id); // Add the id to the values array

  try {
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    res.status(200).json({ message: "Transaction updated successfully" });
  } catch (error) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the transaction." });
  }
};

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query(
      "DELETE FROM transactions WHERE id = $1",
      [id]
    );
    res.status(200).json({ message: "Transaction deleted succesfully" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the transaction." });
  }
};
