const express = require('express');
const {
    getUsers,
    createUser,
    loginUser,
    getProfile
} = require('../controllers/userController');
const auth = require('../middlwares/authMiddleware');

const router = express.Router();

router.route('/').get(auth, getUsers).post(auth, createUser);
router.route('/profile').get(auth, getProfile);
router.route('/register').post(createUser);
router.route('/login').post(loginUser);

module.exports = router;