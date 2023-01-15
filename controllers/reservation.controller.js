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
  const bookId = params.bookId;
  const userId = params.userId;
  let reservationDate = new Date().getTime() / 1000;// default today
  let expirationDate = new Date().getTime() / 1000 + 60 * 60 * 24 * 3; //default 3 days;

  if (params.reservationDate) reservationDate = new Date(params.reservationDate).getTime() / 1000;
  if (params.expirationDate) expirationDate = new Date(params.expirationDate).getTime() / 1000;

  return { bookId, userId, reservationDate, expirationDate };
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
};

const editReservation = (req, res) => {
  try {
    let newData = {};
    if (req.body.expirationDate) newData.expirationDate = new Date(req.body.expirationDate).getTime() / 1000;
    if (req.body.returned) newData.returned = req.body.returned;
    reservationService.editReservation(req.params.reservationId, newData, (err, data) => {
      if(err) throw errorType.internalError;
      return res.status(200).send({ message: data.message });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
}

module.exports = {
  getReservation,
  createReservation,
  editReservation
};