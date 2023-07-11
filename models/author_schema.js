const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const AuthorModel = mongoose.model("Author", authorSchema);
module.exports = AuthorModel;
