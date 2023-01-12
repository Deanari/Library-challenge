const createUser = async (body) => {
  const { name, email, password } = body;

  if (await getUserByEmail(email)) {
    throw errorType.entityExists;
  }
  // TODO
  // return user.create(name, email, password)
}

const getUserByEmail = async () => {
  return {} // TODO
}

const processLogin = async () => {
  return {} // TODO
}

module.exports = {
  createUser,
  getUserByEmail,
  processLogin
};