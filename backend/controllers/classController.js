const asyncHandler = require('express-async-handler');
const ClassModel = require('../models/classModel');

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

    if (!req.body.name) {
        resp.status(400);
        throw new Error('Please provide a class name.')
    }

    const { name } = req.body;

    const _class = await ClassModel.create({
        name
    });

    resp.status(200).json({ results: _class });
});


module.exports = {
    getClasses,
    createClass
}