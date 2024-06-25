/*
    Class Model
    ===========
    Fields

    name: string
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = Schema({
    name: {
        type: String,
        required: true
    },
    start_year: {
        type: Number,
        required: true
    },
    end_year: {
        type: Number,
        required: true
    },
    start_semester: {
        type: String,
        required: true
    },
    end_semester: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);