const Board = require("../models/Board");
const Column = require("../models/Column");
const Task = require("../models/Task");

// GET BOARD ANALYTICS
exports.getBoardAnalytics = async (req, res) => {
  try {
    const { boardId } = req.params;

    // Get all tasks for board through columns
    const columns = await Column.find({ board: boardId, user: req.user._id });
    const columnIds = columns.map((c) => c._id);

    const tasks = await Task.find({ column: { $in: columnIds } });

    // Calculate statistics
    const totalTasks = tasks.length;
    const completedTasks = 0; // Can add completed status if needed
    const highPriority = tasks.filter((t) => t.priority === "High").length;
    const mediumPriority = tasks.filter((t) => t.priority === "Medium").length;
    const lowPriority = tasks.filter((t) => t.priority === "Low").length;

    // Tasks per column
    const tasksByColumn = columns.map((col) => ({
      name: col.title,
      count: tasks.filter((t) => t.column.toString() === col._id.toString())
        .length,
    }));

    // Priority distribution
    const priorityDistribution = [
      { name: "High", value: highPriority, color: "#ef4444" },
      { name: "Medium", value: mediumPriority, color: "#f59e0b" },
      { name: "Low", value: lowPriority, color: "#10b981" },
    ];

    // Overdue tasks
    const overdueTasks = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date()
    ).length;

    res.json({
      totalTasks,
      completedTasks,
      tasksByColumn,
      priorityDistribution,
      overdueTasks,
      highPriority,
      mediumPriority,
      lowPriority,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER DASHBOARD STATS
exports.getDashboardStats = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id });
    const boardIds = boards.map((b) => b._id);

    const columns = await Column.find({ board: { $in: boardIds } });
    const columnIds = columns.map((c) => c._id);

    const tasks = await Task.find({ column: { $in: columnIds } });

    const totalBoards = boards.length;
    const totalColumns = columns.length;
    const totalTasks = tasks.length;

    const tasksDueToday = tasks.filter((t) => {
      if (!t.dueDate) return false;
      const dueDate = new Date(t.dueDate);
      const today = new Date();
      return (
        dueDate.getFullYear() === today.getFullYear() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getDate() === today.getDate()
      );
    }).length;

    const overdueTasks = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date()
    ).length;

    res.json({
      totalBoards,
      totalColumns,
      totalTasks,
      tasksDueToday,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
