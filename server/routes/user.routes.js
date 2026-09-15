const express = require("express");

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
  getUserTasks,
} = require("../controllers/user.controllers");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get("/:id/tasks", authMiddleware, getUserTasks);

router.get("/", getAllUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;