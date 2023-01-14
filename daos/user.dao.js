const db = require('../database/db');

const getAllUsers = (callback) => {
  db.query('SELECT * FROM User', callback);
};

const getUserByEmail = (email, callback) => {
  db.query('SELECT * FROM User WHERE email = ?', [email], callback);
};

const createUser = (params, callback) => {
  const { name, email, password } = params;
  const birthdate = params.birthdate || null;
  db.query('INSERT INTO User (`name`, `email`, `password`, `birth_date`) VALUES (?, ?, ?, ?);', [name, email, password, birthdate], callback);
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser
};
