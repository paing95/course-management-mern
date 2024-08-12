// config
const {
    PORT, CLIENT_URL
} = require('./config/config');
const { errorHandler } = require('./middlwares/errorMiddleware');
const cors = require('cors');

// routers
const activityRouter = require('./routes/activityRouter');
const chatRouter = require('./routes/chatRouter');
const chatRoomRouter = require('./routes/chatRoomRouter');
const classRouter = require('./routes/classRouter');
const courseRouter = require('./routes/courseRouter');
const courseCatalogRouter = require('./routes/courseCatalogRouter');
const courseFileRouter = require('./routes/courseFileRouter');
const userRouter = require('./routes/userRouter');

// libraries
const colors = require('colors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// database
const connectDB = require('./config/db');
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: [
        CLIENT_URL
    ]
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Course Management APIs.')
});


// routes
app.use('/api/activities/', activityRouter);
app.use('/api/chats/', chatRouter);
app.use('/api/chatrooms/', chatRoomRouter);
app.use('/api/classes/', classRouter);
app.use('/api/courses/files/', courseFileRouter);
app.use('/api/courses/catalog/', courseCatalogRouter);
app.use('/api/courses/', courseRouter);
app.use('/api/users/', userRouter);

app.use(errorHandler);

//socket io
io.on('connect', socket => {
    console.log(socket.handshake.query);
    console.log(socket.id, "has joined the server!");

    socket.on('join', data => {
        console.log("Join:", data);
        socket.join(data);
    });

    socket.on('sendMessage', data => {
        console.log("Message received:", data);
        io.to(data.room).emit('newMessage', data);
    });
})

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

