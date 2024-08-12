const Joi = require('joi');

const schema = Joi.object({
    user: Joi.string().required(),
    message: Joi.string().required(),
    chat_room: Joi.string().required()
})

module.exports = schema;