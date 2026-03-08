const Column = require("../models/Column");


// CREATE COLUMN
exports.createColumn = async (req, res) => {
  try {
    const { title, board } = req.body;

    const column = await Column.create({
      title,
      board,
      user: req.user._id,
    });

    res.status(201).json(column);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET COLUMNS FOR BOARD
exports.getColumns = async (req, res) => {
  try {
    const columns = await Column.find({
      board: req.params.boardId,
      user: req.user._id,
    }).sort("order");

    res.json(columns);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE COLUMN
exports.updateColumn = async (req, res) => {
  try {

    const column = await Column.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }

    res.json(column);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE COLUMN
exports.deleteColumn = async (req, res) => {
  try {

    const column = await Column.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }

    res.json({ message: "Column deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};