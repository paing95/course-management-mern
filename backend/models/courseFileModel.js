/*
    CourseFileModel
    ===============
    Fields

    filename: string
    data: buffer
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseFileSchema = Schema({
    filename: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.Types.Buffer,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.Model('CourseFile', courseFileSchema);