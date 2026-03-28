const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color: {
      type: String,
      enum: ["yellow", "pink", "blue", "green", "purple"],
      default: "yellow",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
