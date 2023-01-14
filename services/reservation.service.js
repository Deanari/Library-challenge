const reservationDao = require('../daos/reservation.dao');
const bookService = require('./book.service');
const errorType = require('../utils/error.msg');

const getReservation = (userId, callback) => {
  reservationDao.getReservation(userId, callback);
};

const createReservation = (params, callback) => {
  bookService.getBookById(params.bookId, (err, data) => {
    if (err) return callback(errorType.internalError);
    if (!data || !data.length) return callback(errorType.entityNotFound);
    reservationDao.createReservation(params, callback);
  });
}

module.exports = {
  getReservation,
  createReservation,
};