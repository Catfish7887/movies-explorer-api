const usersRouter = require('express').Router();
const { getUser, patchUser } = require('../controllers/users');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', patchUser);

module.exports = { usersRouter };
