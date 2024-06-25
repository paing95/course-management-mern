const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(), 
    code: Joi.string().required(), 
    description: Joi.string(), 
})

module.exports = schema;