const { constants } = require('http2');
const HTTPError = require('../errors/HTTPError');
const User = require('../models/user');

const getUser = (req, res, next) => {
  const { id } = req.user;

  User.find({ _id: id })
    .then((user) => res.status(constants.HTTP_STATUS_OK).send(user))
    .catch(next(new Error('1')));
};

const patchUser = (req, res, next) => {
  const id = req.user;
  const { name, email } = req.body;

  User.findByIdAndUpdate(id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.status(constants.HTTP_STATUS_OK).send(user))
    .catch(() => next(new HTTPError()));
};

module.exports = { getUser, patchUser };
