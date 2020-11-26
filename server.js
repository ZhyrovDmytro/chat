const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {joinUser, getUserById} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

    socket.on('JoinRoom', ({username, room}) => {
        const newUser = joinUser(socket.id, username, room);

        socket.emit('message', formatMessage('Admin',  'What a hack!')); // single client

        socket.broadcast.to(newUser.room).emit('message', formatMessage('Admin',`${newUser.username} has join the chat`)); // all client except the client that connecting
    });

    socket.on('disconnect', () => {
        io.emit('message', formatMessage('Admin', 'User has left a chat'))
    });

    // listen for chat mesg

    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('User', msg));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
