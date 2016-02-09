(function() {
  var Game = {
    id: location.pathname.split('/').pop() || '',
    position: {
      x: 50,
      y: 50
    },
    constants: {
      STEP: 5
    }
  };

  var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  var socket = io.connect();

  socket.on('connected', function(data) {
    if (Game.id) {
      socket.emit('game.set', Game.id);
    } else {
      Game.id = data.id;
    }
  });

  socket.on('game.control', function(data) {
    move(data.direction);
  });

  socket.on('game.control.setPosition', function(data) {
    setPosition(data);
  });

  function normalise(x, y) {

  }

  function draw() {
    clear();

    ctx.beginPath();
    ctx.arc(Game.position.x, Game.position.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'orange';
    ctx.fill();
  }

  function clear() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);;
  }

  function move(direction) {
    switch (direction) {
      case 'up':
        Game.position.y -= Game.constants.STEP;
        break;
      case 'right':
        Game.position.x += Game.constants.STEP;
        break;
      case 'down':
        Game.position.y += Game.constants.STEP;
        break;
      case 'left':
        Game.position.x -= Game.constants.STEP;
        break;
    }
    draw();
  }

  function setPosition(position) {
    Game.position = position;
    draw();
  }

  function keyDown(e) {
    var direction;

    switch (e.keyCode) {
      case 38:
        direction = 'up';
        break;
      case 39:
        direction = 'right';
        break;
      case 40:
        direction = 'down';
        break;
      case 37:
        direction = 'left';
        break;
    }

    move(direction);
    socket.emit('game.control', {
      direction: direction
    });
  }

  function touchMove(e) {
    var touch = e.touches[0],
      position = {
        x: touch.clientX,
        y: touch.clientY
      };

    setPosition(position);
    socket.emit('game.control.setPosition', position);
  }

  document.addEventListener('touchstart', touchMove);
  document.addEventListener('touchmove', touchMove);
  document.addEventListener('keydown', keyDown);

  draw();
})();