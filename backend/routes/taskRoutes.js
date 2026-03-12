const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

// GET tasks for a column
router.get("/:columnId", protect, async (req, res) => {
  const tasks = await Task.find({
    column: req.params.columnId,
    user: req.user._id,
  }).sort("order");

  res.json(tasks);
});

// CREATE new task
router.post("/", protect, async (req, res) => {
  const { title, description, column, priority, dueDate } = req.body;

  const newTask = new Task({
    title,
    description,
    column,
    priority,
    dueDate,
    user: req.user._id,
  });

  const savedTask = await newTask.save();
  res.json(savedTask);
});

// UPDATE task
router.put("/:id", protect, async (req, res) => {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true },
  );

  res.json(updatedTask);
});

// DELETE task
router.delete("/:id", protect, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  res.json({ message: "Task deleted" });
});

module.exports = router;
