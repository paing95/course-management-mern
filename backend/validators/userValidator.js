const Joi = require('joi');

const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email(
        { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }
    ).required(),
    password: Joi.string().required().min(8).max(20),
    classes: Joi.array().items(Joi.string()).required(),
    role: Joi.string().valid('lecturer', 'student').required()
});

module.exports = schema;