const { Joi, Segments } = require('celebrate');

const { celebrate } = require('./utils');

const passwordSchema = Joi.string().required();
const emailSchema = Joi.string().email();

const joiAuthSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema,
});

const joiUserSchema = Joi.object({
  name: Joi.string().min(2),
  email: emailSchema,
});

const joiUserCreateSchema = joiUserSchema.concat(joiAuthSchema);

const userCreateSegment = { [Segments.BODY]: joiUserCreateSchema };
const userSegment = { [Segments.BODY]: joiUserSchema };
const authSegment = { [Segments.BODY]: joiAuthSchema };

const validateUserCreate = celebrate(userCreateSegment);
const validateUser = celebrate(userSegment);
const valdiateAuth = celebrate(authSegment);

module.exports = {
  validateUser,
  valdiateAuth,
  validateUserCreate,
};
