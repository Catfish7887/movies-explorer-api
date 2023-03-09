const { constants } = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const { usersErrorMessages, serverErrorMessage } = require('../utils/errorMessages');

const getUser = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id })
    .then((user) => res.status(constants.HTTP_STATUS_OK).send(user))
    .catch(() => next(new NotFoundError(usersErrorMessages.notFoundMessage)));
};

const patchUser = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.status(constants.HTTP_STATUS_OK).send(user))
    // .catch(() => next(new NotFoundError(usersErrorMessages.notFoundMessage)));
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(usersErrorMessages.conflictMessage));
      } else {
        next(new ServerError(serverErrorMessage));
      }
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((document) => {
      const { password: removed, ...user } = document.toObject();
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(usersErrorMessages.conflictMessage));
      } else {
        next(new ServerError(serverErrorMessage));
      }
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOneAndValidatePassword({ email, password })
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SALT : 'dev', { expiresIn: '7d' }),
      });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUser, patchUser, createUser, signin,
};
