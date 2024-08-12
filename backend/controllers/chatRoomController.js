const asyncHandler = require('express-async-handler');
const ChatRoomModel = require('../models/chatRoomModel');
const CourseModel = require('../models/courseModel');
const ChatRoomValidator = require('../validators/chatRoomValidator');
const { massageErrors } = require('../validators/helper');

// @desc    Create a new chat room
// @route   POST /api/chatroom/
// @access  Private
const createChatRoom = asyncHandler(async (req, resp) => {
    try {
        await ChatRoomValidator.validateAsync(req.body);
    } catch (error) {
        let errMsg = massageErrors(error.details);
        resp.status(400);
        throw new Error(errMsg);
    }

    const {
        course, participants
    } = req.body;

    const checkIfDuplicate = await ChatRoomModel.find({ course }).exec();
    if (checkIfDuplicate.length > 0) {
        throw new Error('Duplicate chat room exists.');
    }

    const chat_room = await ChatRoomModel.create({
        course, participants
    });

    await CourseModel.updateOne({ _id: course }, { chat_room: chat_room.id });

    resp.status(200).json({ results: chat_room });
});

// @desc    Get chat room detail
// @route   GET /api/chatroom/:id
// @access  Private
const getChatRoomDetail = asyncHandler(async (req, resp) => {
    const findChatRoom = await ChatRoomModel
        .findById(req.params.id)
        .populate([
            'course', 'participants',
        ]);

    if (!findChatRoom) {
        resp.status(400);
        throw new Error('The chat room does not exist.');
    }

    resp.status(200).json({ results: findChatRoom });
});

module.exports = {
    createChatRoom,
    getChatRoomDetail
}