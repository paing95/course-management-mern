const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    start_datetime: Joi.date(),
    end_datetime: Joi.date(),
    days: Joi.array().items(Joi.string()).required(),
    lecturer: Joi.string().required(),
    activities: Joi.array().items(Joi.string()).required(),
    semester: Joi.string().required()
});

module.exports = schema;