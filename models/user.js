const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { invalidPasswordMessage } = require('../utils/errorMessages');

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
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
}, {
  versionKey: false,
  statics: {
    findOneAndValidatePassword({ password, email }) {
      return this.findOne({ email })
        .select('+password')
        .then((document) => {
          if (!document) {
            throw new UnauthorizedError(invalidPasswordMessage);
          }

          return bcrypt.compare(password, document.password).then((isSuccess) => {
            if (!isSuccess) {
              throw new UnauthorizedError(invalidPasswordMessage);
            }

            const { password: removed, ...user } = document.toObject();
            return user;
          });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
