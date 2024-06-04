const express = require('express');
const {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

router.route('/').get(getCourses).post(createCourse);

router.route('/:id').put(updateCourse).delete(deleteCourse);

module.exports = router;