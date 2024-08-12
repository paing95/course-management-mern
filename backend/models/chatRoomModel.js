/*
    Chat Room Model
    ===============
    Fields:

    course: ref to Course
    participants: [{ ref to User }]
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomSchema = Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
