const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI);

        console.log(`Mongo DB Connected: ${connection.connection.host}`.cyan.underline);
    } catch (error) {
        console.log('error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;