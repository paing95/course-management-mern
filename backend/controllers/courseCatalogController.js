const asyncHandler = require('express-async-handler');

// models
const CourseCatalogModel = require('../models/courseCatalogModel');

// validators
const CourseCatalogValidator = require('../validators/courseCatalogValidator');
const { massageErrors } = require('../validators/helper');

// @desc    Get course catalog
// @route   GET /api/courses/catalog/
// @access  Private
const getCoursesCatalog = asyncHandler(async(req, resp) => {
    const courses_catalog = await CourseCatalogModel.find().sort({ code: 1 });
    console.log("Course Catalogs:", courses_catalog);
    resp.status(200).json({ results: courses_catalog });
});

// @desc    Create course catalog
// @route   POST /api/courses/catalog/
// @access  Private
const createCoursesCatalog = asyncHandler(async(req, resp) => {

    try {
        await CourseCatalogValidator.validateAsync(req.body);
    } catch (error) {
        let errMsg = massageErrors(error.details);
        resp.status(400);
        throw new Error(errMsg);
    }

    const { code, name, description } = req.body;
    const courseCatalog = await CourseCatalogModel.create({
        code, name, description
    })

    resp.status(201).json({ results: courseCatalog });
});

module.exports = {
    getCoursesCatalog,
    createCoursesCatalog
}