const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(), 
    start_year: Joi.number().integer(), 
    end_year: Joi.number().integer(), 
    start_semester: Joi.string().required(), 
    end_semester: Joi.string().required()
})

module.exports = schema;