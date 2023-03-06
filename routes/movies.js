const moviesRouter = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie } = require('../validators/movie');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovie, addMovie);
moviesRouter.delete('/:id', deleteMovie);
module.exports = { moviesRouter };
