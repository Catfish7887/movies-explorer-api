const { constants } = require('http2');
const Movie = require('../models/movie');

const checkMovieOwnerAndRemove = (movie, userId) => {
  if (movie.owner.toString() === userId) {
    movie.remove();
  } else {
    // throw new ForbiddenError('Вы не можете удалять чужие карточки');
  }
};

const getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => {
      res.status(constants.HTTP_STATUS_OK).send(movies);
    })
    .catch(() => {
      next(new Error(1));
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
    owner,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

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
  const owner = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      checkMovieOwnerAndRemove(movie, owner);
      res.status(constants.HTTP_STATUS_OK).send(movie);
    })
    .catch(() => { next(new Error('1')); });
};

module.exports = { getMovies, addMovie, deleteMovie };
