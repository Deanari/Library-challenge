const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const errorType = require('./utils/error.msg');
const userController = require('./controllers/user.controller');
const bookController = require('./controllers/book.controller');
const reservationController = require('./controllers/reservation.controller');

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return errorType.errorHandler(errorType.unauthorized, res);

  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY, (err, tokenDecode) => {
    if (err) return errorType.errorHandler(errorType.unauthorized, res);
    req.body.userId = tokenDecode.userId.toString();
    return next();
  });
};

router.get('/', (req, res) => res.status(200).send ({
  message: 'Hello, please specify the resource you are looking for',
}));

// _______________________ PUBLIC ROUTER _______________________

// ---- USER ------
router.post(
  '/user',
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    userController.createUser);

router.post(
  '/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    userController.processLogin);

// ---- BOOK ------
router.get('/book', bookController.getBooks);

// _______________________ PRIVATE ROUTER _______________________

// ---- USER ------
router.get('/user', tokenValidation, userController.getAllUsers);

// ---- BOOK ------
router.post(
  '/book',
    body('name').isLength({ min: 4 }),
    body('genre').isLength({ min: 4 }),
    body('author').isLength({ min: 5 }),
    body('year').isInt({ min: 1900, max: 2050 }),
  tokenValidation, bookController.createBook);

// ---- RESERVATION ------
router.get('/reservation', tokenValidation, reservationController.getReservation);
router.post(
  '/reservation',
    body('bookId').isString(),
    tokenValidation, reservationController.createReservation);
router.put('/reservation/:reservationId', tokenValidation, reservationController.editReservation);

module.exports = router;
