module.exports = {
  setGame: function(socket, newRoom) {
    if (socket.room) {
      socket.leave(socket.room);
    }

    socket.join(newRoom);
    socket.room = newRoom;
  },
  move: function(socket) {
    socket.emit('game.move', function() {

    });
  }
}