var http = require('http'),
  express = require('express'),
  config = require('./config/config'),
  gameControl = require('./app/sockets/gameControl');

var app = express(),
  server = http.createServer(app),
  io = require('socket.io')(server);

require('./config/express')(app, config);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

io.sockets.on('connection', function(socket) {
  var id = parseInt(Math.random() * 100000);

  gameControl.setGame(socket, id);

  socket.emit('connected', { id: id });

  socket.on('game.set', function(data) {
    gameControl.setGame(socket, data);
  });

  socket.on('game.control', function(data) {
    socket.broadcast.to(socket.room).emit('game.control', data);
  });

  socket.on('game.control.setPosition', function(data) {
    socket.broadcast.to(socket.room).emit('game.control.setPosition', data);
  });
});