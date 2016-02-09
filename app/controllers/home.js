var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var newGameId = parseInt(Math.random() * 100000);
  res.redirect('/' + newGameId);
});

router.get('/:gameId', function (req, res, next) {
  res.render('index', {
    title: 'Generator-Express MVC'
  });
});
