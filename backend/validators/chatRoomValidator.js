const Joi = require('joi');

const schema = Joi.object({
    course: Joi.string().required(),
    participants: Joi.array().items(Joi.string()),
})

module.exports = schema;