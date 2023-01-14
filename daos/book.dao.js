const db = require('../database/db');

const getAllBooks = (callback) => {
  db.query('SELECT * FROM Book', callback);
};

const getBooks = (params, callback) => {
  const filters = Object.entries(params);
  let query = 'SELECT * FROM Book';
  let values = [];
  if (filters && filters.length) {
    query += ' WHERE'
    filters.forEach((filter, index) => {
      query += ` ${filter[0]} LIKE ?`
      values.push(`%${filter[1]}%`);
      if (index + 1 < filters.length ) query += ' AND'
    });
  }
  db.query(query, values ,callback);
};

const getBookByName = (name, callback) => {
  db.query('SELECT * FROM Book WHERE name = ?', [name], callback);
};

const getBookById = (bookId, callback) => {
  db.query('SELECT * FROM Book WHERE book_id = ?', [bookId], callback);
};

const createBook = (params, callback) => {
  const { name, genre, year, author } = params;
  db.query('INSERT INTO Book (`name`, `genre`, `year`, `author`) VALUES (?, ?, ?, ?);', [name, genre, year, author], callback);
};

module.exports = {
  getAllBooks,
  getBooks,
  getBookByName,
  getBookById,
  createBook
};
