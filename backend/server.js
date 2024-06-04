// config
const {
    PORT
} = require('./config/config');
const { errorHandler } = require('./middlwares/errorMiddleware');

// routes
const courseRouter = require('./routes/courseRouter');

const express = require('express');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/courses/', courseRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

