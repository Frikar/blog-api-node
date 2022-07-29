const { Schema, model } = require("mongoose");

const CountersSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence_value: {
    type: Number,
    required: true,
  },
});

module.exports = model("Counters", CountersSchema);
