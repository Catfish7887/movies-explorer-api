const moviesRouter = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateId } = require('../validators/movie');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovie, addMovie);
moviesRouter.delete('/:id', validateId, deleteMovie);
module.exports = { moviesRouter };
