const appRouter = require('express').Router();
const { moviesRouter } = require('./movies');

appRouter.use('/movies', moviesRouter);

module.exports = { appRouter };
