// Error definitions.

const missingParameters = {
  status: 400,
  error: 'missing_parameters',
  errorMsg: 'Some parameters are missing, please check your request',
};
  
const alreadyExists = {
  status: 409,
  error: 'entity_exists',
  errorMsg: 'The entity could not be created, it was already created',
};
// _________________

const errorHandler = (error, res) => {
  if (error === undefined) return res.status(500).send(error);
  const { status } = error;
  if (status === undefined) return res.status(500).send(error);
  return res.status(status).send(error);
};
