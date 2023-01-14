const errorType = require('../utils/error.msg');
const bookService = require('../services/book.service');
const { validationResult } = require('express-validator');

const getValidFilters = (params) => {
  let filters = {};
  if (params) {
    const validatedFilters = {
      name: params.name || null,
      author: params.author || null,
      year: params.year || null,
      genre: params.genre || null,
    }
      // creates an object of not null filters from the validated filters
    filters = Object.fromEntries(Object.entries(validatedFilters).filter(([_, v]) => v != null));
  }
  return filters;
}

const getBooks = (req, res) => {
  try {
    const filters = getValidFilters(req.query);
    bookService.getBooks(filters, (err, data) => {
      if(err) throw errorType.internalError;
      return res.status(200).send({ data });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
};

const createBook = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    bookService.createBook(req.body, (error, data) => {
      if(error) return errorType.errorHandler(error, res);
      return res.status(200).send({ message: 'successfully created' });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
};

module.exports = {
  getBooks,
  createBook,
};