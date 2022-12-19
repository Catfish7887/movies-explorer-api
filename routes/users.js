const usersRouter = require('express').Router();
const { getUser } = require('../../../../123/react-mesto-api-full/backend/controllers/users');

usersRouter.get('/me', getUser);

module.exports = { usersRouter };
