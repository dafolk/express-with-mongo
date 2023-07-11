const db = require("../database/mongo.database");
const BookModel = require("../models/book_schema");

const collection = db.collection("books");

const getBooks = async (req, res) => {
  const data = req.body;

  const cursor = collection.find({});
  const books = await cursor.toArray();

  res.status(200).json({
    success: true,
    message: "book list",
    data: books,
  });
};

const insertBook = (req, res) => {
  const data = req.body;

  const query = {
    title: data.title,
    author: data.author,
    released_year: data.released_year,
  };

  collection.insertOne(query);

  res.status(200).json({
    success: true,
    message: "new book added",
    data: query,
  });
};

const getBooksWithSchema = async (req, res) => {
  var books = await BookModel.aggregate([
    { $match: { title: "book1" } },
    {
      $lookup: {
        from: "authors",
        as: "author",
        localField: "authorId",
        foreignField: "_id",
      },
    },
    { $unwind: "$author" },
  ]);
};

const insertBookWithSchema = async (req, res) => {
  const data = req.body;
};

module.exports = { insertBook, getBooks };
