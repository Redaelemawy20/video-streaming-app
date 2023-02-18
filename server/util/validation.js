const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const validateObjId = (v) => {
  if (mongoose.isValidObjectId(v)) return null;
  return "Invalid Object Id";
};

module.exports.validateAll = (Schema, data) => {
  const schema = Joi.object().keys(Schema);
  const { error: validationErrors } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (!validationErrors) return null;
  let errors = {};
  for (let error of validationErrors.details) {
    errors[error.path[0]] = error.message;
  }
  return errors;
};
exports.validateObjId = validateObjId;
