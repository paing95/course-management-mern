const asyncHandler = require('express-async-handler');

// @desc    Get courses
// @route   GET /api/courses/
// @access  Private
const getCourses = asyncHandler(async (req, resp) => {
    resp.status(200).json({ results: "All courses" });
});

// @desc    Create course
// @route   POST /api/courses/
// @access  Private
const createCourse = asyncHandler(async (req, resp) => {

    if (!req.body.name) {
        resp.status(400);
        throw new Error("Please add a course name");
    }

    resp.status(200).json({ results: "Create course" });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, resp) => {
    resp.status(200).json({ results: `Update course ${req.params.id}` });
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, resp) => {
    resp.status(200).json({ results: `Delete course ${req.params.id}` });
});


module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}