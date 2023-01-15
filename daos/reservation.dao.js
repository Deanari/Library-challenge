const db = require('../database/db');

const getReservation = (userId, callback) => {
  db.query('SELECT * FROM Reservation WHERE user_id = ?', [userId], callback);
};

const getExpiredReservations = (callback) => {
  db.query(
    `SELECT r.expiration_date AS expiration_date,
      b.name AS book_name,
      u.name AS user_name, 
      u.email AS user_email
	  FROM Reservation r
		  JOIN User u ON r.user_id = u.user_id
		  JOIN Book b ON b.book_id = r.book_id
    WHERE expiration_date < NOW() AND returned = 0;`,
  callback);
}

const getReservationById = (reservationId, callback) => {
  db.query('SELECT * FROM Reservation WHERE reservation_id = ?', [reservationId], callback);
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
};

const editReservation = (reservationId, params, callback) => {
  const fields = Object.entries(params);
  let query = 'UPDATE RESERVATION SET';
  fields.forEach((field) => query += ` ${field[0]} = ${field[1]}`);
  query += ` WHERE (reservation_id = ${reservationId})`
  db.query(query ,callback);
};

module.exports = {
  getReservation,
  getExpiredReservations,
  getReservationById,
  createReservation,
  getConflictReservations,
  editReservation
};
