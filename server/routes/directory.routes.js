const express = require("express");
const { createDirectory, getAllDirectories, updateDirectory, deleteDirectory } = require("../controllers/directory.controllers");
const router = express.Router();

router.post("/" , createDirectory);
router.get("/" , getAllDirectories);
router.put("/:id" , updateDirectory);
router.delete("/:id" , deleteDirectory);

module.exports = router;