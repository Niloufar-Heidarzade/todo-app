const directoryModel = require("../models/directory.model");

const createDirectory = async (req, res) => {
  try {
    const result = await directoryModel.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

const getAllDirectories = async (req , res) => {
  try {
    const result = await directoryModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

const updateDirectory = async (req ,res) => {
  try {
    const {id} = req.params;
    const data = req.body;
    const result = await directoryModel.findByIdAndUpdate(id , data , {new : true , runValidators : true});
    if(!result) return res.status(404).json({error : "directory not found"});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

const deleteDirectory = async (req , res) => {
  try {
    const {id} = req.params;
    const result = await directoryModel.findByIdAndDelete(id);
    if(!result) return res.status(404).json({error : "directory not found"});
    res.status(200).json({message : "directory deleted successfully" , result});
  } catch (error) {
    res.status(500).json({error : error.message});
  }
};

const getOneDirectory = async

module.exports = {createDirectory , getAllDirectories , updateDirectory , deleteDirectory};
