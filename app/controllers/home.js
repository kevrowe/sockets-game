var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/:gameId', function (req, res, next) {
  res.render('index', {
    title: 'Generator-Express MVC'
  });
});
