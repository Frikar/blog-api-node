const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.Number, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
