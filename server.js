const express = require('express');
const app = express();
const server = require('http').Server(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, { debug: true });

app.use('/peerjs', peerServer);
app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);
  });
});

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
