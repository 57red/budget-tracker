const express = require("express");
const cors = require("cors");
const app = express();

// database
const pool = require("./database/database");

// routes
const budgetRouter = require("./routers and controllers/routers/budgetRoutes");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/", budgetRouter);

// server
app.listen(5000, () => {
  console.log("Server is listening to port 5000...");
});
