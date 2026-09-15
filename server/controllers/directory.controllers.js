const directoryModel = require("../models/directory.model");
const taskModel = require("../models/task.model");

// CREATE DIRECTORY
const createDirectory = async (req, res) => {
  try {
    const result = await directoryModel.create({
      name: req.body.name,
      userId: req.user.userId,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL DIRECTORIES FOR CURRENT USER
const getAllDirectories = async (req, res) => {
  try {
    const result = await directoryModel.find({
      userId: req.user.userId,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE DIRECTORY
const updateDirectory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
      name: req.body.name,
    };

    const result = await directoryModel.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      return res.status(404).json({
        error: "directory not found",
      });
    }

    res.status(200).json({
      message: "directory updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE DIRECTORY
const deleteDirectory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await directoryModel.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!result) {
      return res.status(404).json({
        error: "directory not found",
      });
    }

    res.status(200).json({
      message: "directory deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL TASKS OF ONE DIRECTORY
const getAllTasksOfOneDirectory = async (req, res) => {
  try {
    const { dirId } = req.params;

    const directory = await directoryModel.findOne({
      _id: dirId,
      userId: req.user.userId,
    });

    if (!directory) {
      return res.status(404).json({
        error: "directory not found",
      });
    }

    const result = await taskModel
      .find({
        dirId,
        userId: req.user.userId,
      })
      .populate("dirId")
      .exec();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createDirectory,
  getAllDirectories,
  updateDirectory,
  deleteDirectory,
  getAllTasksOfOneDirectory,
};