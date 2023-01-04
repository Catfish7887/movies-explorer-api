const { Joi, Segments } = require('celebrate');

const { celebrate, schemaObjectId, schemaURL } = require('./utils');

const joiMovieSchema = Joi.object({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: schemaURL.required(),
  trailerLink: schemaURL.required(),
  thumbnail: schemaURL.required(),
  movieId: Joi.string().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),

});

const joiSchemaId = Joi.object({
  id: schemaObjectId.required(),
});

const movieSegment = { [Segments.BODY]: joiMovieSchema };
const idSegment = { [Segments.PARAMS]: joiSchemaId };

const validateMovie = celebrate(movieSegment);
const validateId = celebrate(idSegment);

module.exports = {
  validateMovie,
  validateId,
};
