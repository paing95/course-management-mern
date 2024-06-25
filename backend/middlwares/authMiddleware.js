const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// config
const { JWT_SECRET } = require('../config/config');

// model
const UserModel = require('../models/userModel');

const auth = asyncHandler(async(req, resp, next) => {
    let token;

    if (req.url === '/api/users/login/' ||
        req.url === '/api/users/register/'
    ) {
        next();
    }
    else if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Get user from the token
            req.user = await UserModel.findById(decoded.id).select(
                '-password'
            );

            next();

        } catch (error) {
            console.log('Error:', error);
            resp.status(401);
            throw new Error('Not authorized request.');
        }
    } else if (req.query && req.query.token){
        try {
            // Get token from query
            token = req.query.token;

            // Verify the token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Get user from the token
            req.user = await UserModel.findById(decoded.id).select(
                '-password'
            );

            next();
        } catch (error) {
            console.log('Error:', error);
            resp.status(401);
            throw new Error('Not authorized request.');
        }
    } else {
        resp.status(401);
        throw new Error('Not authorized request.');
    }
});


module.exports = auth;