const errorType = require('../utils/error.msg');
const userService = require('../services/user.service');

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw errorType.missingParameters;

    const user = await userService.createUser(req.body);

    return res.status(200).send({ message: 'successfully created', user });

  } catch (e) {
    return errorType.errorHandler(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ( !email || !password) throw errorType.missingParameters;

    const user = await userService.processLogin(req.body);

    return res.status(200).send({ data: user });

  } catch (e) {
    return errorType.errorHandler(error, res);
  }

};

module.exports = {
  create,
  login,
};