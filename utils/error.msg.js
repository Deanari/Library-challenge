// Error definitions.

const missingParameters = {
  status: 400,
  error: 'missing_parameters',
  errorMsg: 'Some parameters are missing, please check your request',
};
  
const entityExists = {
  status: 409,
  error: 'entity_exists',
  errorMsg: 'The entity could not be created, it was already created',
};

const entityNotFound = {
  status: 404,
  error: 'entity_not_found',
  errorMsg: 'The requested resource was not found',
};

const internalError = {
  status: 500,
  error: 'internal_error',
  errorMsg: 'UPS, something went wrong...',
};

const invalidPassword = {
  status: 409,
  error: 'invalid_password',
  errorMsg: 'Password provided did not match',
};

const unavailable = {
  status: 409,
  error: 'unavailable',
  errorMsg: 'The resource is not available',
};

const unauthorized = {
  status: 401,
  error: 'unauthorized',
  errorMsg: 'Authorization token is invalid or missing',
};

// _________________

const errorHandler = (error, res) => {
  if (error === undefined) return res.status(500).send(error);
  const { status } = error;
  if (status === undefined) return res.status(500).send(error);
  return res.status(status).send(error);
};

module.exports = {
  missingParameters,
  entityExists,
  entityNotFound,
  internalError,
  invalidPassword,
  unavailable,
  unauthorized,
  errorHandler,
};
