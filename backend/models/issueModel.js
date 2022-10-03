const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    details: {
      type: String,
      required: [true, "Details are required"],
    },
    status: {
      type: Number,
      default: 0,
    },
    onVersion: {
      type: String,
      required: [true, "Version is required"],
      default: "1.0.0",
    },
    priority: {
      type: Number,
      required: [true, "Priority is required"],
      default: 0,
    },
    createdBy: {
      type: String,
      required: [true, "Created by is required"],
    },
    assignedTo: {
      type: String,
      required: [true, "Assigned to is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
