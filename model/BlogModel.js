const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
