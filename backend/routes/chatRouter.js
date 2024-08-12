const express = require('express');
const {
    getChats,
    createChat
} = require('../controllers/chatController');
const auth = require('../middlwares/authMiddleware');

const router = express.Router();

router.route('/').get(auth, getChats).post(auth, createChat);

module.exports = router;