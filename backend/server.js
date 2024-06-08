// config
const {
    PORT
} = require('./config/config');
const { errorHandler } = require('./middlwares/errorMiddleware');

// routers
const activityRouter = require('./routes/activityRouter');
const classRouter = require('./routes/classRouter');
const courseRouter = require('./routes/courseRouter');
const courseFileRouter = require('./routes/courseFileRouter');
const userRouter = require('./routes/userRouter');

// libraries
const colors = require('colors');
const express = require('express');

// database
const connectDB = require('./config/db');
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/activities/', activityRouter);
app.use('/api/classes/', classRouter);
app.use('/api/courses/', courseRouter);
app.use('/api/courses/files/', courseFileRouter);
app.use('/api/users/', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

