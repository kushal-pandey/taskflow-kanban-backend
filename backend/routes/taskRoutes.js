const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");



// GET all tasks
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});


// POST create new task
router.post("/", protect, async (req, res) => {
  const { title, description, status } = req.body;

  const newTask = new Task({
    title,
    description,
    status,
    user: req.user._id,
  });

  const savedTask = await newTask.save();
  res.json(savedTask);
});


// PUT update task (status change)
router.put("/:id", protect, async (req, res) => {
  const { status } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updatedTask);
});


// DELETE task
router.delete("/:id", protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});


module.exports = router;
