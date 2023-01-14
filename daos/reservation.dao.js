const db = require('../database/db');

const getReservation = (userId, callback) => {
  db.query('SELECT * FROM Reservation WHERE user_id = ?', [userId], callback);
};

const createReservation = (params, callback) => {
  const { userId, bookId, reservationDate, expirationDate } = params;
  const query = 'INSERT INTO Reservation (`user_id`, `book_id`, `reservation_date`, `expires_on`) VALUES (?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?));'
  db.query(query, [userId, bookId, reservationDate, expirationDate], callback);
};

module.exports = {
  getReservation,
  createReservation
};
