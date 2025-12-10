const express = require("express");
const { createTask, getAllTasks, getAllTasksOfOneDirectory, updateTask, deleteTask } = require("../controllers/task.controllers");
const router = express.Router();

router.post("/", createTask);
router.get("/" , getAllTasks);
router.put("/:id" , updateTask);
router.delete("/:id" , deleteTask);

module.exports = router;