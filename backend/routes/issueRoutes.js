const express = require("express");
const router = express.Router();
const { getIssues, setIssue, updateIssue, deleteIssue } = require("../controllers/issueController");

router.route("/").get(getIssues).post(setIssue);
router.route("/:id").put(updateIssue).delete(deleteIssue);

module.exports = router;
