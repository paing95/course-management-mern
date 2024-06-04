const { NODE_ENV } = require('../config/config');

const errorHandler = (error, req, resp, next) => {
    const statusCode = resp.statusCode ? resp.statusCode : 500;

    resp.status(statusCode);

    resp.json({
        error: error.message,
        stack: NODE_ENV === 'production' ? null: error.stack
    })
};

module.exports = {
    errorHandler
}