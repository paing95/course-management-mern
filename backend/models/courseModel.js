/*
    Course Model
    ============
    Fields:

    name: string
    description: string
    start_datetime: date
    end_datetime: date
    days: [string]
    lecturer: ref to User
    activities: [{ ref to Activity }]
    semester: string
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please add course name.']
    },
    description: {
        type: String,
        required: false
    },
    start_datetime: {
        type: Date,
        required: true
    },
    end_datetime: {
        type: Date,
        required: true
    },
    days: {
        type: [String],
        enum: ['MO', 'TU', 'WE', 'TH', 'FR'],
        required: true
    },
    lecturer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    activities: [{
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    }],
    semester: {
        type: String,
        required: [true, 'Please add the course semester']
    },
    files: [{
        file: {
            type: Schema.Types.ObjectId,
            ref: 'CourseFile'
        },
        activity: {
            type: Schema.Types.ObjectId,
            ref: 'Activity'
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);