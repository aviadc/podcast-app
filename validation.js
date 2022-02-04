const Joi = require('joi');

const schemaRegisterValidation = Joi.object({
  name: Joi.string().max(40).required(),
  email: Joi.string().max(100).required().email(),
  password: Joi.string().min(6).required(),
});

const schemaLoginValidation = Joi.object({
  email: Joi.string().max(100).required().email(),
  password: Joi.string().min(6).required(),
})

module.exports = {schemaRegisterValidation,schemaLoginValidation}