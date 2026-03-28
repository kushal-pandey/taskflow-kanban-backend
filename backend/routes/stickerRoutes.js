const express = require("express");
const router = express.Router();
const {
  createSticker,
  getStickers,
  deleteSticker,
} = require("../controllers/stickerController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createSticker);
router.get("/:taskId", protect, getStickers);
router.delete("/:id", protect, deleteSticker);

module.exports = router;
