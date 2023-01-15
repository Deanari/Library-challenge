const errorType = require('../utils/error.msg');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

const getAllUsers = (req, res) => {
  try {
    userService.getAllUsers((error, data) => {
      if(error) return errorType.errorHandler(error, res);
      return res.status(200).send({ data });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
};

const getParsedParams = (params) => {
  const { name, email, password } = params;
  let birthDate = null;
  if (params.birthDate) birthDate = new Date(params.birthDate).getTime() / 1000
  return { name, email, password, birthDate };
};

const createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    userService.createUser(getParsedParams(req.body), (error, data) => {
      if(error) return errorType.errorHandler(error, res);
      return res.status(200).send({ message: 'successfully created' });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }
};

const processLogin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    userService.processLogin(req.body, (error, data) => {
      if(error) return errorType.errorHandler(error, res);
      return res.status(200).send({ data: data });
    });
  } catch (error) {
    return errorType.errorHandler(error, res);
  }

};

module.exports = {
  getAllUsers,
  createUser,
  processLogin,
};