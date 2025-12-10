const taskModel = require("../models/task.model");

const createTask = async (req , res) => {
  try {
    const result = await taskModel.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

const getAllTasks = async (req , res) => {
  try {
    const result = await taskModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

const updateTask = async (req , res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const result = await taskModel.findByIdAndUpdate(id , data , {new : true , runValidators : true});
    if(!result) return res.status(404).json({error : "task not found"});
    res.status(200).json({message: "task updated successfully " , result});
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

const deleteTask = async (req , res) => {
  try {
    const {id} = req.params;
    const result = await taskModel.findByIdAndDelete(id);
    if(!result) return res.status(404).json({error : "task not found"});
    res.status(200).json({message: "task deleted successfully " , result});
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

module.exports = {createTask , getAllTasks  , updateTask , deleteTask};

