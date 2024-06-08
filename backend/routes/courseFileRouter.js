const express = require('express');
const multer = require('multer');
const {
    uploadCourseFile,
    viewCourseFile
} = require('../controllers/courseFileController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/').post(upload.single('file'), uploadCourseFile);
router.route('/:id').get(viewCourseFile);

module.exports = router;