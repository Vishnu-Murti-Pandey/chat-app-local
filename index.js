const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const server = http.createServer(app);

// socket.io
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


const PORT = process.env.PORT;

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
