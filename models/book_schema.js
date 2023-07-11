const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    releaseYear: {
      type: String,
      required: false,
      default: null,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
  },
  { timestamps: true, versionKey: false }
);

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
