const express = require('express');
const multer = require('multer');
const {
    uploadCourseFile,
    viewCourseFile
} = require('../controllers/courseFileController');
const auth = require('../middlwares/authMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/').post(auth, upload.single('file'), uploadCourseFile);
router.route('/:id').get(auth, viewCourseFile);

module.exports = router;