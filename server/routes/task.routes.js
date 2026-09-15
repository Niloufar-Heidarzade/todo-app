const express = require("express");

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask
} = require("../controllers/task.controllers");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);

router.get("/", getAllTasks);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;