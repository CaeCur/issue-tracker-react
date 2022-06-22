const asyncHandler = require("express-async-handler");
const Issue = require("../models/issueModel");

// @desc Get issues
// @route GET /api/issues
// @access Private
const getIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find();
  res.status(200).json(issues);
});

// @desc POST issues
// @route POST /api/issues
// @access Private
const setIssue = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("No data sent");
  }

  const issue = await Issue.create({
    title: req.body.title,
    details: req.body.details,
    status: req.body.status,
    onVersion: req.body.onVersion,
    priority: req.body.priority,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo,
    dueDate: req.body.dueDate,
  });

  res.status(200).json(issue);
});

// @desc Update issues
// @route PUT /api/issues/:id
// @access Private
const updateIssue = asyncHandler(async (req, res) => {
  //grab issue from DB
  const issue = await Issue.findById(req.params.id);

  // check if issue exists
  if (!issue) {
    res.status(400);
    throw new Error("Issue not found");
  }

  //check for user

  //check if user is owner of issue

  //update issue
  const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedIssue);
});

// @desc Delete issues
// @route DELETE /api/issues/:id
// @access Private
const deleteIssue = asyncHandler(async (req, res) => {
  //grab issue from DB
  const issue = await Issue.findById(req.params.id);

  // check if issue exists
  if (!issue) {
    res.status(400);
    throw new Error("Issue not found");
  }

  //check for user

  //check if user is owner of issue

  //update issue
  const deletedIssue = await Issue.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedIssue);
});

module.exports = { getIssues, setIssue, updateIssue, deleteIssue };
