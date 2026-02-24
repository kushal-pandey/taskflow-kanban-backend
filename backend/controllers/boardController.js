const Board = require("../models/Board");

// ================= CREATE BOARD =================
exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;

    const board = await Board.create({
      title,
      user: req.user._id, // comes from auth middleware
    });

    res.status(201).json(board);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json({ message: "Board deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

