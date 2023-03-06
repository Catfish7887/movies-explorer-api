const { constants } = require('http2');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const { moviesErrorMessages, serverErrorMessage } = require('../utils/errorMessages');

const checkMovieOwnerAndRemove = (movie, userId) => {
  if (movie.owner.toString() === userId) {
    movie.remove();
  } else {
    throw new ForbiddenError(moviesErrorMessages.forbiddenMessage);
  }
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(constants.HTTP_STATUS_OK).send(movies);
    })
    .catch(() => {
      next(new ServerError(serverErrorMessage));
    });
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(moviesErrorMessages.badRequestMessage));
      } else {
        next(new ServerError(serverErrorMessage));
      }
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  const owner = req.user._id;

  Movie.findOne({ movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(moviesErrorMessages.notFoundMessage);
      }
      checkMovieOwnerAndRemove(movie, owner);
      res.status(constants.HTTP_STATUS_OK).send(movie);
    })
    .catch((err) => next(err));
};

const deleteAll = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      movies.forEach((movie) => movie.remove());
      res.send('ok');
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovies, addMovie, deleteMovie, deleteAll,
};
