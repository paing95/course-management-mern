const express = require('express');
const {
    getClasses,
    createClass
} = require('../controllers/classController');
const auth = require('../middlwares/authMiddleware');

const router = express.Router();

router.route('/').get(getClasses).post(auth, createClass);

module.exports = router;

