const { constants } = require('http2');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const checkMovieOwnerAndRemove = (movie, userId) => {
  if (movie.owner.toString() === userId) {
    movie.remove();
  } else {
    throw new ForbiddenError('Вы не можете удалять чужие фильмы');
  }
};

const getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => {
      res.status(constants.HTTP_STATUS_OK).send(movies);
    })
    .catch(() => {
      next(new ServerError('Произошла неизвестная ошибка'));
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
  }).then((movie) => res.send(movie)).catch(() => next(new Error(1)));
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  const owner = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      checkMovieOwnerAndRemove(movie, owner);
      res.status(constants.HTTP_STATUS_OK).send(movie);
    })
    .catch(() => next(new NotFoundError('Фильм по указанному ID не найден')));
};

module.exports = { getMovies, addMovie, deleteMovie };
