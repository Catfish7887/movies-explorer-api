const usersRouter = require('express').Router();
const { getUser, patchUser } = require('../controllers/users');
const { validateUser } = require('../validators/user');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', validateUser, patchUser);

module.exports = { usersRouter };
