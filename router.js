const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const userController = require('./controllers/user.controller');
const bookController = require('./controllers/book.controller');

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      status: 401,
      error: 'unauthorized',
      errorMsg: 'Authorization token is missing',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, tokenDecode) => {
    if (err) {
      return res.status(401).send({
        status: 401,
        error: err.message,
        errorMsg: err.name,
      });
    }

    req.user =  { userId: tokenDecode.userId }

    return next();
  });
};

router.get('/', (req, res) => res.status(200).send ({
  message: 'Hello, please specify the resource you are looking for',
}));

// _______________________ PUBLIC ROUTER _______________________

router.post(
  '/user',
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    userController.createUser);

router.post('/login', userController.processLogin);
router.get('/book', bookController.getBooks);

// _______________________ PRIVATE ROUTER _______________________
router.get('/user', tokenValidation, userController.getAllUsers);
router.post(
  '/book',
    body('name').isLength({ min: 4 }),
    body('genre').isLength({ min: 4 }),
    body('author').isLength({ min: 5 }),
    body('year').isInt({ min: 1900, max: 2050 }),
  tokenValidation, bookController.createBook);

module.exports = router;
