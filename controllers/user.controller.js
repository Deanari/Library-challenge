const errorType = require('../utils/error.msg');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

const getAllUsers = (req, res) => {
  try {
    userService.getAllUsers((err, data) => {
      if(err) throw errorType.internalError;
      return res.status(200).send({ data });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
};

const createUser = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    userService.createUser(req.body, (error, data) => {
      if(error) return errorType.errorHandler(error, res);
      return res.status(200).send({ message: 'successfully created' });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
};

const processLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if ( !email || !password) return errorType.errorHandler(errorType.missingParameters, res);

    userService.processLogin(req.body, (error, data) => {
      if(error) return errorType.errorHandler(error, res);
      return res.status(200).send({ data: data });
    });

  } catch (e) {
    return errorType.errorHandler(error, res);
  }

};

module.exports = {
  getAllUsers,
  createUser,
  processLogin,
};