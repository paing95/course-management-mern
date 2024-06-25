const asyncHandler = require('express-async-handler');
const ActivityModel = require('../models/activityModel');

// @desc    Get activities
// @route   GET /api/activities/
// @access  Private
const getActivities = asyncHandler(async(req, resp) => {
    const activities = await ActivityModel.find().sort({ name: 1 });

    resp.status(200).json({ results: activities });
});

// @desc    Get activities
// @route   POST /api/activities/
// @access  Private
const createActivity = asyncHandler(async(req, resp) => {
    if (!req.body.name) {
        resp.status(400);
        throw new Error('Please provide an activity name.');
    }

    const { name } = req.body;

    const activity = await ActivityModel.create({
        name
    });

    resp.status(200).json({ results: activity });
});

module.exports = {
    getActivities,
    createActivity
}