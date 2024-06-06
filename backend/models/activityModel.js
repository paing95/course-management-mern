/*
    Activity Model
    ==============
    Fields:

    name: string
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);