const Joi = require("@hapi/joi");

const checkSubject = Joi.object({
  data: Joi.string().required(),
});

const checkAnswer = Joi.object({
  testName: Joi.string().required(),
  ans: Joi.string().required(),
  type: Joi.number().required(),
  _id: Joi.string().required(),
});

module.exports = {
  checkSubject,
  checkAnswer,
};
