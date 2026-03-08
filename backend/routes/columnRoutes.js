const express = require("express");
const router = express.Router();

const {
  createColumn,
  getColumns,
  updateColumn,
  deleteColumn,
} = require("../controllers/columnController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, createColumn);
router.get("/:boardId", authMiddleware, getColumns);
router.put("/:id", authMiddleware, updateColumn);
router.delete("/:id", authMiddleware, deleteColumn);

module.exports = router;