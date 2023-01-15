const reservationDao = require('../daos/reservation.dao');
const bookService = require('./book.service');
const errorType = require('../utils/error.msg');

const getReservation = (userId, callback) => {
  reservationDao.getReservation(userId, callback);
};

const getExpiredReservations = (callback) => {
  console.log('get expired reservations service')
  reservationDao.getExpiredReservations(callback);
};

const getReservationById = (reservationId, callback) => {
  reservationDao.getReservationById(reservationId, callback);
};

const checkAvaliability = (params, callback) => {
  reservationDao.getConflictReservations(params, (error, data) => {
    if (error) return callback(errorType.internalError);
    if (data && data.length) return callback(null, false);
    return callback(null, true)
  });
};

const createReservation = (params, callback) => {
  bookService.getBookById(params.bookId, (error, data) => {
    if (error) return callback(errorType.internalError);
    if (!data || !data.length) return callback(errorType.entityNotFound);
    checkAvaliability(params, (error, isAvailable) => {
      if (error) return callback(errorType.internalError);
      if (!isAvailable) return callback(errorType.unavailable);
      reservationDao.createReservation(params, callback);
    });
  });
};

const editReservation = (reservationId, params, callback) => {
  getReservationById(reservationId, (error, data) => {
    if (error) return callback(errorType.internalError);
    if (!data || !data.length) return callback(errorType.entityNotFound);
    reservationDao.editReservation(reservationId, params, callback);
  })
};

module.exports = {
  getReservation,
  getExpiredReservations,
  createReservation,
  editReservation,
};