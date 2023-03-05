const mongoose = require('mongoose');

// eslint-disable-next-line no-useless-escape
const regExp = /https?:\/\/[a-z0-9\.-\/-_~:\/?#\[\]@!$&'()*+,;=]+/i;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,

  },
  director: {
    type: String,
    required: true,

  },
  duration: {
    type: Number,
    required: true,

  },
  year: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,

  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regExp.test(value),
      message: () => 'Картинка должна быть URL-адресом',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regExp.test(value),
      message: () => 'Трейлер должен быть URL-адресом',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => regExp.test(value),
      message: () => 'Постер должен быть URL-адресом',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',

  },
  movieId: {
    type: Number,
    required: true,
    unique: true,

  },
  nameRU: {
    type: String,
    required: true,
    unique: true,

  },
  nameEN: {
    type: String,
    required: true,
    unique: true,

  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
