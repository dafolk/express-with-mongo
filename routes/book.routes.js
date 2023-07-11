const { insertBook, getBooks } = require("../controllers/book.controller");

const express = require('express');
const router = express();

router.route('/books').get(getBooks).post(insertBook);

exports.default = (app) => {
  app.use('/api', router);
}
