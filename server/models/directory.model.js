const { Schema, model } = require("mongoose");

const directorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model("Directory", directorySchema);
