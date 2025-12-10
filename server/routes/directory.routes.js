const express = require("express");
const { createDirectory, getAllDirectories, updateDirectory, deleteDirectory , getAllTasksOfOneDirectory } = require("../controllers/directory.controllers");
const router = express.Router();

router.post("/" , createDirectory);
router.get("/" , getAllDirectories);
router.put("/:id" , updateDirectory);
router.delete("/:id" , deleteDirectory);
router.get("/:dirId/tasks" , getAllTasksOfOneDirectory);

module.exports = router;