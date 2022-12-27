const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: () => 'Электронная почта должна быть вида email@example.com',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {},
}, {
  versionKey: false,
  statics: {
    findOneAndValidatePassword({ password, email }) {
      return this.findOne({ email })
        .select('+password')
        .then((document) => {
          if (!document) {
            throw new UnauthorizedError('Неправильный логин или пароль');
          }

          return bcrypt.compare(password, document.password).then((isSuccess) => {
            if (!isSuccess) {
              throw new UnauthorizedError('Неправильный логин или пароль');
            }

            const { password: removed, ...user } = document.toObject();
            return user;
          });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
