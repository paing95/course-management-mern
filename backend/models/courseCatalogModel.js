/*
    CourseCatalog
    =============

    code: string
    name: string
    description: string
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseCatalogSchema = Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('CourseCatalog', courseCatalogSchema);