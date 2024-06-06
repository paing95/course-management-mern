const express = require('express');
const {
    getActivities,
    createActivity
} = require('../controllers/activityController');

const router = express.Router();

router.route('/').get(getActivities).post(createActivity);

module.exports = router;