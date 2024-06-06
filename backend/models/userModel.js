/*
    User Model
    ==========
    Fields

    first_name: string
    last_name: string
    email: string
    password: string
    role: string
    classes: [
        { ref to Class }
    ]
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['lecturer', 'student'],
        required: true
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
})

module.exports = mongoose.model('User', userSchema);