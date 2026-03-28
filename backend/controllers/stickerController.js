const Sticker = require("../models/Sticker");

// CREATE STICKER
exports.createSticker = async (req, res) => {
  try {
    const { emoji, taskId } = req.body;

    if (!emoji || !taskId) {
      return res.status(400).json({ message: "Emoji and task ID required" });
    }

    const sticker = await Sticker.create({
      emoji,
      task: taskId,
      user: req.user._id,
    });

    res.status(201).json(sticker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET STICKERS FOR TASK
exports.getStickers = async (req, res) => {
  try {
    const stickers = await Sticker.find({
      task: req.params.taskId,
      user: req.user._id,
    });

    res.json(stickers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE STICKER
exports.deleteSticker = async (req, res) => {
  try {
    const sticker = await Sticker.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!sticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }

    res.json({ message: "Sticker deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
