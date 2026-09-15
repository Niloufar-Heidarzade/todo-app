const userModel = require("../models/user.model");
const taskModel = require("../models/task.model");
const directoryModel = require("../models/directory.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CREATE USER
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    await directoryModel.create({
      name: "Main",
      userId: result._id,
    });

    const userResponse = result.toObject();

    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const result = await userModel.find().select("-password");

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const data = {
      username,
      email,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const result = await userModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    const userResponse = result.toObject();

    delete userResponse.password;

    res.status(200).json({
      message: "user updated successfully",
      result: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    const userResponse = result.toObject();

    delete userResponse.password;

    res.status(200).json({
      message: "user deleted successfully",
      result: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(404).json({
        error: "invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        error: "user not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET USER TASKS
const getUserTasks = async (req, res) => {
  try {
    const { id } = req.params;

    if (id !== req.user.userId.toString()) {
      return res.status(403).json({
        error: "you are not allowed to access these tasks",
      });
    }

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

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
  getCurrentUser,
  getUserTasks,
};