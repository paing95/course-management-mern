const express = require('express');
const {
    getClasses,
    createClass
} = require('../controllers/classController');

const router = express.Router();

router.route('/').get(getClasses).post(createClass);

module.exports = router;

