var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (sessionId, msg) => {
        io.to(sessionId).emit('chat message', msg);
    });

    socket.on('join room', (sessionId) => {
        socket.join(sessionId);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});