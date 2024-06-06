const asyncHandler = require('express-async-handler');
const CourseModel = require('../models/courseModel');
const CourseValidator = require('../validators/courseValidator');
const { massageErrors, removeInvalidData } = require('../validators/helper');

const fieldsAllowedToUpdate = [
    'name',
    'description',
    'start_datetime',
    'end_datetime',
    'days',
    'lecturer',
    'activities',
    'semeste'
];


// @desc    Get courses
// @route   GET /api/courses/
// @access  Private
const getCourses = asyncHandler(async (req, resp) => {

    const nameFilter = req.query.name || "";
    const filters = {};

    if (nameFilter) {
        filters['name'] = nameFilter;
    }

    const courses = await CourseModel
        .find(filters)
        .populate('lecturer')
        .populate('activities')
        .sort({ name: 1 })

    resp.status(200).json({ results: courses });
});

// @desc    Create a new course
// @route   POST /api/courses/
// @access  Private
const createCourse = asyncHandler(async (req, resp) => {
    try {
        await CourseValidator.validateAsync(req.body);
    } catch (error) {
        let errMsg = massageErrors(error.details);
        resp.status(400);
        throw new Error(errMsg);
    }

    const {
        name, description,
        start_datetime, end_datetime,
        days, lecturer,
        activities, semester
    } = req.body;

    const checkIfDuplicate = await CourseModel.find({ name, semester }).exec();
    if (checkIfDuplicate.length > 0) {
        throw new Error('Duplicate course exists.');
    }

    const course = await CourseModel.create({
        name, description,
        start_datetime, end_datetime,
        days, lecturer,
        activities, semester
    });

    resp.status(200).json({ results: {} });
});

// @desc    Update an existing course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, resp) => {

    const findCourse = await CourseModel.findById(req.params.id);

    if (!findCourse) {
        resp.status(400);
        throw new Error('The course does not exist.');
    }

    const new_data = removeInvalidData(req.body, fieldsAllowedToUpdate);

    const course = await CourseModel.updateOne({ _id: req.params.id }, new_data);

    resp.status(200).json({ results: course });
});

// @desc    Delete an existing course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, resp) => {
    const findCourse = await CourseModel.findById(req.params.id);

    if (!findCourse) {
        resp.status(400);
        throw new Error('The course does not exist.');
    }

    const course = await CourseModel.findByIdAndDelete(req.params.id);

    resp.status(200).json({ results: course });
});


module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}