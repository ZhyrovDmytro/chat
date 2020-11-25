const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.emit('message', 'What a hack!'); // single client

    socket.broadcast.emit('message', 'user has join the chat'); // all client except the client that connecting

    socket.on('disconnect', () => {
        io.emit('message', 'User has left a chat')
    });

    // listen for chat mesg

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
