const appRouter = require('express').Router();
const { createUser, signin } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { valdiateAuth, validateUserCreate } = require('../validators/user');
const { moviesRouter } = require('./movies');
const { usersRouter } = require('./users');

appRouter.post('/signup', validateUserCreate, createUser);
appRouter.post('/signin', valdiateAuth, signin);
appRouter.use('/movies', auth, moviesRouter);
appRouter.use('/users', auth, usersRouter);

module.exports = { appRouter };
