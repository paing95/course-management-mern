const express = require('express');
const {
    getCourses,
    getCourseDetail,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');
const auth = require('../middlwares/authMiddleware');

const router = express.Router();

router.route('/').get(auth, getCourses).post(auth, createCourse);

router.route('/:id').put(auth, updateCourse).delete(auth, deleteCourse).get(auth, getCourseDetail);

module.exports = router;