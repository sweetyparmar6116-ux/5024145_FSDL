import express from 'express';
import Expense from '../models/Expense.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/expenses — get all expenses for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/expenses — add a new expense
router.post('/', auth, async (req, res) => {
  try {
    const { name, amount, category, date, timestamp } = req.body;

    if (!name || !amount || !category)
      return res.status(400).json({ message: 'name, amount, and category are required.' });

    const expense = await Expense.create({
      userId: req.userId,
      name,
      amount,
      category,
      date,
      timestamp,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/expenses/:id — delete an expense (only owner can delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted)
      return res.status(404).json({ message: 'Expense not found.' });

    res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
