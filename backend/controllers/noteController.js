const Note = require("../models/Note");
const Task = require("../models/Task");

// CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const { content, taskId, color } = req.body;

    if (!content || !taskId) {
      return res.status(400).json({ message: "Content and task ID required" });
    }

    const note = await Note.create({
      content,
      task: taskId,
      user: req.user._id,
      color: color || "yellow",
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET NOTES FOR TASK
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      task: req.params.taskId,
      user: req.user._id,
    }).sort("-createdAt");

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE NOTE
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
