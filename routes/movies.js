const moviesRouter = require('express').Router();
const { getMovies, addMovie } = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', addMovie);
module.exports = { moviesRouter };
