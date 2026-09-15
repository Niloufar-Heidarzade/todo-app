const { Schema, model } = require("mongoose");

const directorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Directory", directorySchema);