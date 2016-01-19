var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/dockerhub', function(req, res, next) {
  //console.log(JSON.stringify(req));
  var runScript = require('./runScript');
  runScript(function(){
      console.log('hook was handled');
  });
  res.send('hook was handled');
});

module.exports = router;
