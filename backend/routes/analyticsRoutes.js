const express = require("express");
const router = express.Router();
const {
  getBoardAnalytics,
  getDashboardStats,
} = require("../controllers/analyticsController");
const protect = require("../middleware/authMiddleware");

router.get("/board/:boardId", protect, getBoardAnalytics);
router.get("/dashboard/stats", protect, getDashboardStats);

module.exports = router;
