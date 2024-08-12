const express = require('express');
const {
    getChatRoomDetail,
    createChatRoom
} = require('../controllers/chatRoomController');
const auth = require('../middlwares/authMiddleware');

const router = express.Router();

router.route('/').post(auth, createChatRoom);

router.route('/:id').get(auth, getChatRoomDetail)

module.exports = router;