const bookDao = require('../daos/book.dao');
const errorType = require('../utils/error.msg');

const getAllBooks = (callback) => {
  bookDao.getAllBooks(callback);
};

const getBooks = (params, callback) => {
  bookDao.getBooks(params, callback);
};

const createBook = (params, callback) => {
  getBookByName(params.name, (err, data) => {
    if (err) return callback(errorType.internalError);
    if (data && data.length) return callback(errorType.entityExists);
    bookDao.createBook(params, callback);
  });
}

const getBookByName = (email, callback) => {
  bookDao.getBookByName(email, callback);
}

const getBookById = (bookId, callback) => {
  bookDao.getBookById(bookId, callback);
}

module.exports = {
  getAllBooks,
  getBooks,
  createBook,
  getBookByName,
  getBookById
};