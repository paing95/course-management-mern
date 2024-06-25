const asyncHandler = require('express-async-handler');
const ClassModel = require('../models/classModel');
const ClassValidator = require('../validators/classValidator');
const { massageErrors } = require('../validators/helper');

// @desc    Get classes
// @route   GET /api/classes/
// @access  Private
const getClasses = asyncHandler(async(req, resp) => {
    const classes = await ClassModel.find();

    resp.status(200).json({ results: classes });
});


// @desc    Create a new class
// @route   POST /api/classes/
// @access  Private
const createClass = asyncHandler(async(req, resp) => {

    try {
        await ClassValidator.validateAsync(req.body);
    } catch (error) {
        let errMsg = massageErrors(error.details);
        resp.status(400);
        throw new Error(errMsg);
    }

    const { name, start_year, end_year, start_semester, end_semester } = req.body;

    const checkIfDuplicate = await ClassModel.find({ 
        name, start_year, end_year, start_semester, end_semester 
    }).exec();
    if (checkIfDuplicate.length > 0) {
        throw new Error('Duplicate class exists.');
    }

    const _class = await ClassModel.create({
        name, start_year, end_year, start_semester, end_semester
    });

    resp.status(200).json({ results: _class });
});


module.exports = {
    getClasses,
    createClass
}