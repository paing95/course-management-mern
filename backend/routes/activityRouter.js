const express = require('express');
const {
    getActivities,
    createActivity
} = require('../controllers/activityController');
const auth = require('../middlwares/authMiddleware');

const router = express.Router();

router.route('/').get(auth, getActivities).post(auth, createActivity);

module.exports = router;