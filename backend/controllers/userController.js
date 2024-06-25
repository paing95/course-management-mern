const asyncHandler = require('express-async-handler');

// config
const { JWT_SECRET } = require('../config/config');

// models
const UserModel = require('../models/userModel');

// validators
const UserValidator = require('../validators/userValidator');
const { massageErrors } = require('../validators/helper');


// libraries
const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken');


// @desc    get login user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async(req, resp) => {
    const user = await UserModel.findById(req.user.id);
    resp.status(200).json({
        results: user
    });
})

// @desc    login
// @route   POST    /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, resp) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        resp.status(400);
        throw new Error('Wrong username and password.');
    }

    const result = await bcryptjs.compare(password, user.password);

    if (!result) {
        resp.status(400);
        throw new Error('Wrong username and password.');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '7d'
    })

    resp.status(200).json({ results: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        token
    } })
})

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

    resp.status(201).json({ results: user });
    
})

module.exports = {
    getUsers,
    createUser,
    loginUser,
    getProfile
}