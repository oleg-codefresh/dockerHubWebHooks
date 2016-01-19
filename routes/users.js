var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/dockerhub', function(req, res, next) {
  res.send('hook was handled');
});

module.exports = router;
