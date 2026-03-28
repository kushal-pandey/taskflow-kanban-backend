const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    color: {
      type: String,
      default: "#3b82f6",
    },

    dueDate: {
      type: Date,
    },

    order: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);