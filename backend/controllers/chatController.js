const asyncHandler = require('express-async-handler');
const ChatModel = require('../models/chatModel');
const ChatValidator = require('../validators/chatValidator');
const { massageErrors } = require('../validators/helper');

// @desc    Create a new chat
// @route   POST /api/chats/
// @access  Private
const createChat = asyncHandler(async (req, resp) => {
    try {
        await ChatValidator.validateAsync(req.body);
    } catch (error) {
        let errMsg = massageErrors(error.details);
        resp.status(400);
        throw new Error(errMsg);
    }

    const {
        user,
        message,
        chat_room
    } = req.body;

    const chat = await ChatModel.create({
        user,
        message,
        chat_room
    });

    resp.status(200).json({ results: chat });
});

// @desc    Get chats
// @route   GET /api/chats/
// @access  Private
const getChats = asyncHandler(async (req, resp) => {

    const room_filter = req.query.room || "";
    const filters = {};

    if (room_filter) {
        filters['chat_room'] = room_filter;
    }

    const chats = await ChatModel
        .find(filters)
        .populate([
            'user'
        ])

    resp.status(200).json({ results: chats });
});

module.exports = {
    createChat,
    getChats
}