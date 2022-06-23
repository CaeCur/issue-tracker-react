const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { newUser, loginUser, getUser } = require("../controllers/userController");

router.post("/", newUser);
router.post("/login", loginUser);
router.get("/:id", protect, getUser);

module.exports = router;
