const express = require("express");
const router = express.Router();
const {
  createBoard,
  getBoards,
  deleteBoard,
} = require("../controllers/boardController");

const authMiddleware = require("../middleware/authMiddleware");

// Create board
router.post("/", authMiddleware, createBoard);

// Get boards
router.get("/", authMiddleware, getBoards);

// Delete board
router.delete("/:id", authMiddleware, deleteBoard);

module.exports = router;