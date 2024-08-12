/*
    Chat Model
    =========
    Fields:

    user: ref to User
    message: String
    chat_room: ref to Chat Room
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    chat_room: {
        type: Schema.Types.ObjectId,
        ref: 'ChatRoom',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);