const appRouter = require('express').Router();
const { createUser, signin } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { moviesRouter } = require('./movies');
const { usersRouter } = require('./users');

appRouter.post('/signup', createUser);
appRouter.post('/signin', signin);
appRouter.use('/movies', auth, moviesRouter);
appRouter.use('/users', auth, usersRouter);

module.exports = { appRouter };
