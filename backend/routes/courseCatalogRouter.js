const express = require('express');
const {
    getCoursesCatalog,
    createCoursesCatalog
} = require('../controllers/courseCatalogController');
const auth = require('../middlwares/authMiddleware');

const router = express.Router();

router.route('/').get(auth, getCoursesCatalog).post(auth, createCoursesCatalog);

module.exports = router;