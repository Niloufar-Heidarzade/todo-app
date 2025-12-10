const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [3, "title must be 3 characters or more"],
    maxlength: [30, "title can't be more than 30 characters"],
  },
  description: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  deadline: { type: Date, default: Date.now },
  dirId: { type: Schema.Types.ObjectId, ref: "Directory", required: true },
});

module.exports = model("Task", taskSchema);
