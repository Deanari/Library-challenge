const errorType = require('../utils/error.msg');
const reservationService = require('../services/reservation.service');
const { validationResult } = require('express-validator');

const getReservation = (req, res) => {
  try {
    reservationService.getReservation(req.body.userId, (err, data) => {
      if(err) throw errorType.internalError;
      return res.status(200).send({ data });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
};

const getParsedParams = (params) => {
  let parsedParams = {};
  if (params) {
    parsedParams = {
      bookId: params.bookId || null,
      userId: params.userId || null,
      reservationDate: new Date(params.reservationDate).getTime() / 1000,
      expirationDate: new Date(params.expirationDate).getTime() / 1000,
    }
  }
  return parsedParams;
};

const createReservation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    reservationService.createReservation(getParsedParams(req.body), (error, data) => {
      if (error) return errorType.errorHandler(error, res);
      return res.status(200).send({ message: 'Reservation created successfully' });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
}

module.exports = {
  getReservation,
  createReservation
};