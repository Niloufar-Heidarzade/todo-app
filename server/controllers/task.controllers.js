const taskModel = require("../models/task.model");
const directoryModel = require("../models/directory.model");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { dirId } = req.body;

    const directory = await directoryModel.findOne({
      _id: dirId,
      userId: req.user.userId,
    });

    if (!directory) {
      return res.status(404).json({
        error: "directory not found",
      });
    }

    const result = await taskModel.create({
      ...req.body,
      userId: req.user.userId,
    });

    await result.populate("dirId");

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL TASKS FOR CURRENT USER
const getAllTasks = async (req, res) => {
  try {
    const result = await taskModel
      .find({ userId: req.user.userId })
      .populate("dirId")
      .exec();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.dirId) {
      const directory = await directoryModel.findOne({
        _id: data.dirId,
        userId: req.user.userId,
      });

      if (!directory) {
        return res.status(404).json({
          error: "directory not found",
        });
      }
    }

    const result = await taskModel
      .findOneAndUpdate(
        {
          _id: id,
          userId: req.user.userId,
        },
        data,
        {
          new: true,
          runValidators: true,
        }
      )
      .populate("dirId");

    if (!result) {
      return res.status(404).json({
        error: "task not found",
      });
    }

    res.status(200).json({
      message: "task updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await taskModel.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!result) {
      return res.status(404).json({
        error: "task not found",
      });
    }

    res.status(200).json({
      message: "task deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};