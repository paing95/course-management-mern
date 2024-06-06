const asyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel');
const UserValidator = require('../validators/userValidator');
const { massageErrors } = require('../validators/helper');

// @desc    Get users
// @route   GET /api/users/
// @access  Private
const getUsers = asyncHandler(async(req, resp) => {

    const roleFilter = req.query.role || "";
    const filters = {};

    if (roleFilter) {
        filters['role'] = roleFilter;
    }
    
    const users = await UserModel
        .find(filters)
        .populate('classes')
        .sort({ first_name: 1 });

    resp.status(200).json({ results: users });
});

// @desc    Create user
// @route   POST /api/users/
// @access  Private
const createUser = asyncHandler(async(req, resp) => {
    try {
        await UserValidator.validateAsync(req.body);
    } catch (error) {
        let errMsg = massageErrors(error.details);
        resp.status(400);
        throw new Error(errMsg);
    }
    
    const {
        first_name,
        last_name,
        email,
        password,
        role,
        classes
    } = req.body;

    const user = await UserModel.create({
        first_name, last_name,
        email, password,
        role, classes
    });

    resp.status(200).json({ results: user });
    
})

module.exports = {
    getUsers,
    createUser
}