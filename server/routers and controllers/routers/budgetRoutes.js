const express = require("express");
const router = express.Router();

// controllers
const budgetController = require("../controllers/budgetControllers");

// ROUTES
// create a budget
router.post("/budget", budgetController.createBudget);

// get all budget
router.get("/budgets", budgetController.getAllBudget);

// update a budget
router.put("/budget/:id", budgetController.updateBudget);

// delete a budget
router.delete("/budget/:id", budgetController.deleteBudget);

module.exports = router;
