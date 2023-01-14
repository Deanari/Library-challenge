const db = require('../database/db');

const getReservation = (userId, callback) => {
  db.query('SELECT * FROM Reservation WHERE user_id = ?', [userId], callback);
};

const createReservation = (params, callback) => {
  const { userId, bookId, reservationDate, expirationDate } = params;
  const query = 'INSERT INTO Reservation (`user_id`, `book_id`, `reservation_date`, `expiration_date`) VALUES (?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?));'
  db.query(query, [userId, bookId, reservationDate, expirationDate], callback);
};

const getConflictReservations = (params, callback) => {
  const { bookId, reservationDate, expirationDate } = params;
  const query = `SELECT *
    FROM Reservation
    WHERE 
    ((expiration_date > FROM_UNIXTIME(${reservationDate}) AND expiration_date < FROM_UNIXTIME(${expirationDate}))
    OR (reservation_date > FROM_UNIXTIME(${reservationDate}) AND reservation_date < FROM_UNIXTIME(${expirationDate}))
    OR (reservation_date < FROM_UNIXTIME(${reservationDate}) AND expiration_date > FROM_UNIXTIME(${expirationDate})))
    AND book_id = ${bookId};`
  db.query(query, callback);
}

module.exports = {
  getReservation,
  createReservation,
  getConflictReservations
};
