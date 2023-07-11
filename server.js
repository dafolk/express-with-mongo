const express = require("express");
const register = require("./controllers/user.controller");
const glob = require("glob");
const { authorization } = require("./middleware/auth.middleware");
const AuthorModel = require("./models/author_schema");
const BookModel = require("./models/book_schema");
const mongoose = require("mongoose");
const db = require("./database/mongo.database");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(authorization);

// const routes = glob.sync(__dirname + "/routes/*.js");

mongoose
  .connect("mongodb://node:password@127.0.0.1:27017/node")
  .then(console.log("connected"))
  .catch((err) => {
    console.log(err);
  });

// routes.forEach((item) => {
//   require(item).default(app);
// });

app.get("/api/books", async (req, res) => {
  // var collection = await AuthorModel.create({ name: "U Aung" });

  // var collection = await BookModel.create({
  //   title: "book",
  //   releaseYear: "2022",
  //   authorId: "64a526bf7e58757f12067052",
  // });

  var books = await BookModel.aggregate([
    {
      $lookup: {
        from: "authors",
        as: "author",
        localField: "authorId",
        foreignField: "_id",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  //   var books = await BookModel.find({}).populate("authorId");

  res.send(books);
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});
