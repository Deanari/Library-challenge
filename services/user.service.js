const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userDao = require('../daos/user.dao');
const errorType = require('../utils/error.msg');

const getAllUsers = (callback) => {
  userDao.getAllUsers(callback);
};

const createUser = (params, callback) => {
  getUserByEmail(params.email, (err, data) => {

    if (err) return callback(errorType.internalError);
    if (data && data.length) return callback(errorType.entityExists);

    params.password = bcrypt.hashSync(params.password, 10);
    userDao.createUser(params, callback);
  });
}

const getUserByEmail = (email, callback) => {
  userDao.getUserByEmail(email, callback);
}

const generateAuthToken = (userData) => {
  const payload = {
    userId: userData.user_id,
    email: userData.email,
    name: userData.name
  };

  const key = process.env.JWT_SECRET_KEY
  return jwt.sign(payload, key, {
    expiresIn: 60 * 60 * 1, // expires in 1 hour
  });
}

const processLogin = (params, callback) => {

  getUserByEmail(params.email, async (err, data) => {

    if (err) return callback(errorType.internalError);
    if (!data || !data.length) return callback(errorType.entityNotFound);

    const userData =  data[0]
    const validPassword = await bcrypt.compare(params.password, userData.password);
    if (!validPassword) return callback(errorType.invalidPassword);

    const token = generateAuthToken(userData)
    return callback(null, { 
      userId: userData.user_id,
      email: userData.email,
      name: userData.name,
      token
    });
  });
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  processLogin
};